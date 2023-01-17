import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/interfaces';
import { CartService } from '../../services/cart.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() public product!: Product;
  @Input() public value = 5;

  public checked = false;
  public quantityForm!: UntypedFormGroup;
  private itemQuantity: number | undefined = 1;

  constructor(
    private cartService: CartService,
    private formBuilder: UntypedFormBuilder
  ) {}

  public ngOnInit(): void {
    this.checkInCart();
    this.buildForm();
  }

  public addToCart(product: Product, quantity: string): void {
    this.cartService.addToCart(product, quantity);
  }

  public decreaseValue(): void {
    if (this.quantityForm.get('quantity')?.value > 1) {
      this.quantityForm.setValue({
        quantity: this.quantityForm.get('quantity')?.value - 1,
      });
    }
  }

  public increaseValue(): void {
    this.quantityForm.setValue({
      quantity: +this.quantityForm.get('quantity')?.value + 1,
    });
  }

  private buildForm(): void {
    this.quantityForm = this.formBuilder.group({
      quantity: [this.itemQuantity, [Validators.required]],
    });
  }

  private checkInCart(): void {
    const item = this.cartService.getProduct(this.product);
    this.checked = !!item;
    if (this.checked) {
      this.itemQuantity = item?.quantity;
    }
  }
}
