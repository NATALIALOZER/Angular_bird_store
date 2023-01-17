import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { switchMap } from 'rxjs/operators';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../../shared/services/alert.service';
import { Product } from '../../../shared/models/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  public form!: UntypedFormGroup;
  public product!: Product;
  public submitted = false;
  private updateSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.productService.getById(params['id']);
        })
      )
      .subscribe((product: Product) => {
        this.product = product;
        this.form = new UntypedFormGroup({
          name: new UntypedFormControl(product.name, [Validators.required]),
          price: new UntypedFormControl(product.price, [Validators.required]),
        });
      });
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.updateSubscription = this.productService
      .update({
        ...this.product,
        name: this.form.value.name,
        price: this.form.value.price,
      })
      .subscribe(() => {
        this.submitted = false;
        this.alert.warning('Товар оновлено');
      });
  }
}
