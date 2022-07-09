import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/interfaces';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products$!: Observable<Product[]>;

  /*slider*/
  disabled = false;
  max = 35;
  min = 5;
  step = 15;
  thumbLabel = false;
  value = 5;
  vertical = false;

  /*paginator_native*/
  public productsArray: Product[] = [];
  public page: string | number = 1;
  public productsPerPage = this.value;

  public search = '';
  public loading = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.products$ = this.productService.getAll();
  }

  public ngOnInit(): void {
    this.loading = true;
    this.products$.subscribe(res => {
      this.productsArray = res;
      this.loading = false;
    });
    this.cartService.getItems();
  }

  public changePageSize(): void {
    this.productsPerPage = Number(this.value);
    this.page = 1;
  }

  public searchItem(newItem: string): void {
    this.search = newItem;
  }
}
