import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '@shared/services/product.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../../shared/services/alert.service';
import { Product } from '@shared/common_types/interfaces';
import { WithDestroy } from '@shared/mixins/destroy';
import { IEditForm } from './types/edit';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent extends WithDestroy() implements OnInit {
  public editForm: FormGroup<IEditForm>;
  public product: Product;
  public submitted = false;
  private updateSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
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
      .subscribe((product: Product) => {
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
      } as Product)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.submitted = false;
        this.alert.warning('Товар оновлено');
      });
  }
}
