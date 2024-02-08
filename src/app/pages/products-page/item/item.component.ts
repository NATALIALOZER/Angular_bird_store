import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { CurrencyPipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

import { BehaviorSubject, timer } from 'rxjs';

import { Store } from '@ngrx/store';

import { IProduct, IProductGroup } from '@shared/common_types/interfaces';
import { ButtonSize } from '@shared/components/button/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IItemForm } from '../types/item';
import {
  addProduct,
  removeAllEntriesOfProduct,
} from '../../../state/cart/cart.actions';
import { MaterialModule } from '@shared/material/material.module';
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
export class ItemComponent implements OnInit {
  @Input() public product!: IProduct;
  @Input() public value = 5;
  @Input() public addedToCart: null | IProductGroup[] = [];

  public quantityForm!: FormGroup<IItemForm>;
  public ButtonSize: typeof ButtonSize = ButtonSize;

  private store = inject(Store);

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
    const itemInCart = this.addedToCart?.find(
      item => item.product.id === this.product.id
    );

    this.quantityForm = new FormGroup<IItemForm>({
      quantity: new FormControl(itemInCart?.count || 1, {
        nonNullable: true,
      }),
      checkedCart: new FormControl(!!itemInCart, { nonNullable: true }),
    });
  }
}
