import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ImageSnippet, Product } from '../../../shared/models/interfaces';
import { ProductService } from '../../../shared/services/product.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  //@Input() public events: any;
  @Output() public imageSnippetEventEmitter: EventEmitter<ImageSnippet> =
    new EventEmitter<ImageSnippet>();
  public selectedFile!: ImageSnippet;
  public selected = false;

  public form!: UntypedFormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private productService: ProductService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    if (this.selected) {
      const product: Product = {
        ...this.form.value,
        id: this.form.value.name,
        imageUrl: this.selectedFile.src,
      };
      this.productService.create(product).subscribe(() => {
        this.form.reset();
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
    if(file) reader.readAsDataURL(file);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: [null, [Validators.required]],
      description: ['', [Validators.required]],
      imageUrl: [''],
    });
  }
}
