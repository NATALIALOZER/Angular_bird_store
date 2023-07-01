import { Component, OnInit } from '@angular/core';
import { ProductService } from '@shared/services/product.service';
import { Observable } from 'rxjs';
import { IProduct, IProductGroup } from '@shared/common_types/interfaces';
import { CartService } from '@shared/services/cart.service';
import { IPageSizeParams } from '@shared/components/custom-slider/types/slider.interface';
import { LoadingService } from '@shared/components/loading/loading.service';
import { takeUntil } from 'rxjs/operators';
import { LoadingIndicator } from './types/products';
import { WithDestroy } from '@shared/mixins/destroy';
import { Store } from '@ngrx/store';
import { selectGroupedCartEntries } from '../../state/cart/cart.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends WithDestroy() implements OnInit {
  public products$: Observable<IProduct[]>;

  /*loader*/
  public LoadingIndicator = LoadingIndicator;

  /*paginator_native*/
  public value = 5;
  public productsArray: IProduct[] = [];
  public page: string | number = 1;
  public productsPerPage: number = this.value;
  public search = '';
  public quantityById: Map<string, number> = new Map();

  private cartEntries$: Observable<IProductGroup[]>;

  constructor(
    public loadingService: LoadingService,
    private productService: ProductService,
    private cartService: CartService,
    private store: Store
  ) {
    super();
  }

  public ngOnInit(): void {
    this.products$ = this.productService.getAll();

    this.loadingService
      .doLoading(this.products$, this, LoadingIndicator.OPERATOR)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => (this.productsArray = res));
    this.checkInCart();
  }

  public searchItem(newItem: string): void {
    this.search = newItem;
  }

  public onPagination(data: IPageSizeParams): void {
    this.productsPerPage = data.itemsPerPage;
    this.page = data.page;
  }

  private checkInCart(): void {
    this.cartEntries$ = this.store.select(selectGroupedCartEntries);
    this.cartEntries$.pipe(takeUntil(this.destroy$)).subscribe(cartEntries => {
      cartEntries.forEach(item =>
        this.quantityById.set(item.product.id, item.count)
      );
    });
  }
}
