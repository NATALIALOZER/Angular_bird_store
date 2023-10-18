import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IProductGroup } from '@shared/common_types/interfaces';
import { IPageSizeParams } from '@shared/components/custom-slider/types/slider.interface';
import { LoadingService } from '@shared/components/loading/loading.service';
import { takeUntil } from 'rxjs/operators';
import { LoadingIndicator } from './types/products';
import { WithDestroy } from '@shared/mixins/destroy';
import { Store } from '@ngrx/store';
import { selectGroupedCartEntries } from '../../state/cart/cart.selectors';
import { selectAllProducts } from '../../state/products/products.selectors';
import { loadProducts } from '../../state/products/products.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends WithDestroy() implements OnInit {
  public products$: Observable<IProduct[]> = this.store.select(selectAllProducts);

  /*loader*/
  public LoadingIndicator = LoadingIndicator;

  /*paginator_native*/
  public value = 5;
  public page: any = 1;
  public productsPerPage: number = this.value;
  public search = '';
  public quantityById: Map<string, number> = new Map();

  private cartEntries$: Observable<IProductGroup[]>;

  constructor(
    public loadingService: LoadingService,
    private store: Store
  ) {
    super();
  }

  public ngOnInit(): void {
    this.store.dispatch(loadProducts());

    // this.loadingService
    //   .doLoading(this.products$, this, LoadingIndicator.OPERATOR)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((res: IProduct[]) => (this.productsArray = res));

    this.checkInCart();
  }

  public searchItem(newItem: string): void {
    this.page = 1;
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
