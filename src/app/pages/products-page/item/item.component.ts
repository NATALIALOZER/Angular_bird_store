import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@shared/common_types/interfaces';
import { CartService } from '@shared/services/cart.service';
import { ButtonSize } from '@shared/components/button/button';
import {
  AbstractControl,
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() public product!: Product;
  @Input() public value = 5;

  public quantityForm!: UntypedFormGroup;
  public ButtonSize: typeof ButtonSize = ButtonSize;
  private itemQuantity: number | undefined = 1;

  constructor(
    private cartService: CartService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.checkInCart();
  }

  public addToCart(product: Product, quantity: string): void {
    this.cartService.addToCart(product, quantity);
  }

  public decreaseValue(): void {
    if (this.form.quantity?.value > 1) {
      this.form.quantity.setValue(this.form.quantity?.value - 1);
    }
  }

  public increaseValue(): void {
    this.form.quantity.setValue(+this.form.quantity?.value + 1);
  }

  get form(): { [key: string]: AbstractControl } {
    return this.quantityForm.controls;
  }

  public getControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  private buildForm(): void {
    this.quantityForm = this.formBuilder.group({
      quantity: [this.itemQuantity, [Validators.required]],
      checkedCart: [false],
    });
  }

  private checkInCart(): void {
    const item = this.cartService.getProduct(this.product);

    this.form.checkedCart.setValue(!!item);
    if (this.quantityForm.value.checkedCart) {
      this.itemQuantity = item?.quantity;
    }
  }
}
