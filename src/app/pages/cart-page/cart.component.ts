import { Component, OnInit } from '@angular/core';
import { IProduct, IProductGroup } from '@shared/common_types/interfaces';
import { Router } from '@angular/router';
import { DialogComponent } from '@shared/components/modals/dialog/dialog.component';
import { WithDestroy } from '@shared/mixins/destroy';
import { takeUntil } from 'rxjs/operators';
import { ButtonSize } from '@shared/components/button/button';
import { Store } from '@ngrx/store';
import {
  addProduct,
  clearCart,
  removeAllProducts,
  removeProduct,
} from '../../state/cart/cart.actions';
import { selectGroupedCartEntries } from '../../state/cart/cart.selectors';
import { Observable } from 'rxjs';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent extends WithDestroy() implements OnInit {
  public cartEntries$: Observable<IProductGroup[]>;
  public ButtonSize: typeof ButtonSize = ButtonSize;

  constructor(
    // private cartService: CartService,
    public dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {
    super();
  }

  ngOnInit(): void {
    this.cartEntries$ = this.store.select(selectGroupedCartEntries);
  }

  public removeProduct(product: IProduct): void {
    // this.cartService.removeFromCart(product);
    // this.items = this.items.filter(item => item.id !== product.id);
  }

  public clearCart(): void {
    this.store.dispatch(clearCart());
  }

  public oneMore(entry: any): void {
    this.store.dispatch(addProduct({ product: entry.product, quantity: '1' }));
  }

  public oneLess(entry: any): void {
    this.store.dispatch(removeProduct(entry.product));
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Make an Order' },
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe();
  }

  public toPayment(): void {
    this.router.navigate(['/payment']);
  }
}
