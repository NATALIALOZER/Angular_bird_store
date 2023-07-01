import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '@shared/common_types/interfaces';
import { ButtonSize } from '@shared/components/button/button';
import { FormControl, FormGroup } from '@angular/forms';
import { IItemForm } from '../types/item';
import { Store } from '@ngrx/store';
import {
  addProduct,
  removeAllProducts,
} from '../../../state/cart/cart.actions';
import { WithDestroy } from '@shared/mixins/destroy';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent extends WithDestroy() implements OnInit {
  @Input() public product: IProduct;
  @Input() public quantityById: Map<string, number>;
  @Input() public value = 5;

  public quantityForm!: FormGroup<IItemForm>;
  public ButtonSize: typeof ButtonSize = ButtonSize;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  public manageCart(product: IProduct, quantity: string): void {
    this.form.checkedCart.value
      ? this.store.dispatch(removeAllProducts(product))
      : this.store.dispatch(addProduct({ product, quantity }));
  }

  public decreaseValue(): void {
    if (this.form.quantity?.value > 1) {
      this.form.quantity.setValue(this.form.quantity?.value - 1);
    }
  }

  public increaseValue(): void {
    this.form.quantity.setValue(+this.form.quantity?.value + 1);
  }

  get form(): IItemForm {
    return this.quantityForm.controls;
  }

  private buildForm(): void {
    this.quantityForm = new FormGroup<IItemForm>({
      quantity: new FormControl(this.quantityById.get(this.product.id) || 1, {
        nonNullable: true,
      }),
      checkedCart: new FormControl(false, { nonNullable: true }),
    });

    timer(0)
      .pipe(take(1))
      .subscribe(() =>
        this.form.checkedCart.setValue(!!this.quantityById.get(this.product.id))
      );
  }
}
