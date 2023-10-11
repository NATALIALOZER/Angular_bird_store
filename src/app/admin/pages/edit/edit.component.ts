import { AlertService } from '../../shared/services/alert.service';
import { IProduct } from '@shared/common_types/interfaces';
import { WithDestroy } from '@shared/mixins/destroy';
import { IEditForm } from './types/edit';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../../pages/products-page/products.service';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent extends WithDestroy() implements OnInit {
  public editForm: FormGroup<IEditForm>;
  public product: IProduct;
  public submitted = false;
  private updateSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private alert: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.productService.getById(params['id']);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((product: IProduct) => {
        this.product = product;
        this.editForm = new FormGroup<IEditForm>({
          name: new FormControl(product.name, [Validators.required]),
          price: new FormControl(product.price, [Validators.required]),
        });
      });
  }

  public submit(): void {
    if (this.editForm.invalid) {
      return;
    }

    this.submitted = true;

    this.updateSubscription = this.productService
      .update({
        ...this.product,
        name: this.editForm.value.name,
        price: this.editForm.value.price,
      } as IProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.submitted = false;
        this.alert.warning('Товар оновлено');
      });
  }
}
