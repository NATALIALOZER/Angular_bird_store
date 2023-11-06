import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Router, RouterLink } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectGroupedCartEntries, selectTotalPrice } from '../../state/cart/cart.selectors';
import { addProduct, clearCart, loadCart, removeAllEntriesOfProduct, removeProduct
} from '../../state/cart/cart.actions';

import { IProduct, IProductGroup } from '@shared/common_types/interfaces';
import { DialogComponent } from '@shared/components/modals/dialog.component';
import { WithDestroy } from '@shared/mixins/destroy';
import { ButtonSize } from '@shared/components/button/button';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [
    ButtonComponent,
    MatCardModule,
    RouterLink,
    CommonModule
  ]
})
export class CartComponent extends WithDestroy() implements OnInit {
  public cartEntries$: Observable<IProductGroup[]> = this.store.select(selectGroupedCartEntries);
  public ButtonSize: typeof ButtonSize = ButtonSize;
  public countCart$ = this.store.select(selectTotalPrice);

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(loadCart());
  }

  public removeProduct(product: IProduct): void {
    this.store.dispatch(removeAllEntriesOfProduct(product));
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
