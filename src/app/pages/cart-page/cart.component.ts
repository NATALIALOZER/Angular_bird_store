import { Component, OnInit } from '@angular/core';
import { CartService } from '@shared/services/cart.service';
import { Product } from '@shared/common_types/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '@shared/components/modals/dialog/dialog.component';
import { WithDestroy } from '@shared/mixins/destroy';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent extends WithDestroy() implements OnInit {
  public items: Product[] = [];

  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  public removeProduct(product: Product): void {
    this.cartService.removeFromCart(product);
    this.items = this.items.filter(item => item.id !== product.id);
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
