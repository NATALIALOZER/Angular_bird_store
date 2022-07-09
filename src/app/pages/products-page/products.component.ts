import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/interfaces';
import { CartService } from '../../shared/services/cart.service';
import { IPageSizeParams } from '../../shared/components/custom-slider/slider.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products$!: Observable<Product[]>;

  public value = 5;

  /*slider*/
  // disabled = false;
  // max = 35;
  // min = 5;
  // step = 15;
  // thumbLabel = false;
  // vertical = false;

  /*paginator_native*/
  public productsArray: Product[] = [];
  public page: string | number = 1;
  public productsPerPage: number = this.value;

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

  public searchItem(newItem: string): void {
    this.search = newItem;
  }

  public onPagination(data: IPageSizeParams): void {
    this.productsPerPage = data.itemsPerPage;
    this.page = data.page;
  }
}
