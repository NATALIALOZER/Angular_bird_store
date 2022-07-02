import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Product } from '../../shared/models/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/modals/dialog/dialog.component';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public items: Product[] = [];

  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  public removeProduct(product: Product):void {
    this.cartService.removeFromCart(product)
    this.items = this.items.filter( item => item.id !== product.id);
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Make an Order' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  toPayment() {
    this.router.navigate(['/payment'])
  }
}

