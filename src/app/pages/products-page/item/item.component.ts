import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@shared/common_types/interfaces';
// import { CartService } from '@shared/services/cart.service';
import { ButtonSize } from '@shared/components/button/button';
import { FormControl, FormGroup } from '@angular/forms';
import { IItemForm } from '../types/item';
import { Store } from '@ngrx/store';
import { addProduct } from '../../../state/cart/cart.actions';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() public product!: Product;
  @Input() public value = 5;

  public quantityForm!: FormGroup<IItemForm>;
  public ButtonSize: typeof ButtonSize = ButtonSize;

  constructor(
    // private cartService: CartService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.buildForm();
    // this.checkInCart();
  }

  public addToCart(product: Product, quantity: string): void {
    // this.cartService.addToCart(product, quantity);
    this.store.dispatch(addProduct({ product, quantity }));
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
      quantity: new FormControl(1, { nonNullable: true }),
      checkedCart: new FormControl(false, { nonNullable: true }),
    });
  }

  /*private checkInCart(): void {
    const item = this.cartService.getProduct(this.product);
    this.form.quantity.setValue(item?.quantity || 1);
    setTimeout(() => this.form.checkedCart.setValue(!!item), 0);
  }*/
}
