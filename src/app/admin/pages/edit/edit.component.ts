import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { switchMap } from 'rxjs/operators';

import { IProduct } from '@shared/common_types/interfaces';
import { AlertService } from '../../shared/services/alert.service';
import { ProductsService } from '../../../pages/products-page/products.service';
import { IEditForm } from './types/edit';

@Component({
  selector: 'app-edit',
  standalone: true,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  imports: [ReactiveFormsModule, NgClass, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent implements OnInit {
  public editForm!: FormGroup<IEditForm>;
  public product: IProduct | undefined = undefined;
  public submitted = false;

  private route$ = inject(ActivatedRoute).params;
  private alert = inject(AlertService);
  private destroyRef = inject(DestroyRef);
  private productService = inject(ProductsService);

  ngOnInit(): void {
    this.createEditForm();
    this.loadProductData();
  }

  public submit(): void {
    if (this.editForm.invalid) {
      return;
    }

    this.submitted = true;

    this.productService
      .update({
        ...this.product,
        name: this.editForm.value.name,
        price: this.editForm.value.price,
      } as IProduct)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.submitted = false;
        this.alert.warning('Товар оновлено');
      });
  }

  private createEditForm(): void {
    this.editForm = new FormGroup<IEditForm>({
      name: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required]),
    });
  }

  private loadProductData(): void {
    this.route$
      .pipe(
        switchMap((params: Params) =>
          this.productService.getById(params['id'])
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((product: IProduct) => {
        this.product = product;
        this.editForm.patchValue({ ...product });
      });
  }
}
