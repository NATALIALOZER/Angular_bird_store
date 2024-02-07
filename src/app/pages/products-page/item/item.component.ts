import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '@shared/common_types/interfaces';
import { ButtonSize } from '@shared/components/button/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IItemForm } from '../types/item';
import { Store } from '@ngrx/store';
import {
  addProduct,
  removeAllEntriesOfProduct,
} from '../../../state/cart/cart.actions';
import { WithDestroy } from '@shared/mixins/destroy';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { MaterialModule } from '@shared/material/material.module';
import { CurrencyPipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ButtonCheckboxComponent } from '@shared/components/button-checkbox/button-checkbox.component';

@Component({
  selector: 'app-item',
  standalone: true,
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  imports: [
    MaterialModule,
    NgClass,
    RouterLink,
    NgStyle,
    ReactiveFormsModule,
    ButtonComponent,
    ButtonCheckboxComponent,
    CurrencyPipe,
    NgIf,
  ],
})
export class ItemComponent extends WithDestroy() implements OnInit {
  @Input() public product!: IProduct;
  @Input() public quantityById!: Map<string, number>;
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
      ? this.store.dispatch(addProduct({ product, quantity }))
      : this.store.dispatch(removeAllEntriesOfProduct(product));
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

    timer(0).subscribe(() =>
      this.form.checkedCart.setValue(!!this.quantityById.get(this.product.id))
    );
  }
}
