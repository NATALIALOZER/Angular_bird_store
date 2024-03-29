import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from '@shared/services/product.service';
import { AlertService } from '../../shared/services/alert.service';
import { takeUntil } from 'rxjs/operators';
import { ICreateForm, ImageSnippet } from './types/icreate-form';
import { WithDestroy } from '@shared/mixins/destroy';
import { Product } from '@shared/common_types/interfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends WithDestroy() implements OnInit {
  @Output() public imageSnippetEventEmitter: EventEmitter<ImageSnippet> =
    new EventEmitter<ImageSnippet>();
  public selectedFile: ImageSnippet = { src: '' };
  public selected = false;
  public createForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private alert: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  get form(): { [key: string]: AbstractControl } {
    return this.createForm.controls;
  }

  public submit(): void {
    if (this.createForm.invalid) {
      return;
    }
    if (this.selected) {
      const product: Product = {
        ...this.createForm.value,
        id: this.createForm.value.name,
        imageUrl: this.selectedFile.src,
      };
      this.productService
        .create(product)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.createForm.reset();
          this.createForm.markAsUntouched();
          this.alert.success('Товар успішно створений');
        });
    } else {
      this.alert.danger('Будь ласка, додай фото товару');
    }
  }

  public processFile(imageInput: HTMLInputElement): void {
    const file: File | undefined = imageInput?.files?.[0];
    const reader = new FileReader();
    reader.addEventListener('load', (el: ProgressEvent<FileReader>) => {
      this.selectedFile = {
        file: file,
        src: el?.target?.result,
      };
      this.selected = true;
      this.imageSnippetEventEmitter.emit(this.selectedFile);
    });
    if (file) reader.readAsDataURL(file);
  }

  private buildForm(): void {
    this.createForm = this.formBuilder.group<ICreateForm>({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      imageUrl: [''],
    });
  }
}
