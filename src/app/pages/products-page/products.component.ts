import { Component, OnInit } from '@angular/core';
import { ProductService } from '@shared/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '@shared/common_types/interfaces';
import { CartService } from '@shared/services/cart.service';
import { IPageSizeParams } from '@shared/components/custom-slider/types/slider.interface';
import { LoadingService } from '@shared/components/loading/loading.service';
import { takeUntil } from 'rxjs/operators';
import { LoadingIndicator } from './types/products';
import { WithDestroy } from '@shared/mixins/destroy';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends WithDestroy() implements OnInit {
  public products$: Observable<Product[]>;

  /*loader*/
  public LoadingIndicator = LoadingIndicator;

  /*paginator_native*/
  public value = 5;
  public productsArray: Product[] = [];
  public page: string | number = 1;
  public productsPerPage: number = this.value;

  public search = '';

  constructor(
    public loadingService: LoadingService,
    private productService: ProductService,
    private cartService: CartService
  ) {
    super();
    this.products$ = this.productService.getAll();
  }

  public ngOnInit(): void {
    this.loadingService
      .doLoading(this.products$, this, LoadingIndicator.OPERATOR)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.productsArray = res;
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
