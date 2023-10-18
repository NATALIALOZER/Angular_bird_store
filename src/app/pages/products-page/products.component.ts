import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NgxPaginationModule } from 'ngx-pagination';

import { Store } from '@ngrx/store';
import { selectGroupedCartEntries } from '../../state/cart/cart.selectors';
import { selectAllProducts } from '../../state/products/products.selectors';
import { loadProducts } from '../../state/products/products.actions';

import { WithDestroy } from '@shared/mixins/destroy';
import { SearchInputComponent } from '@shared/components/search-input/search-input.component';
import { IPageSizeParams } from '@shared/components/custom-slider/types/slider.interface';
import { CustomSliderComponent } from '@shared/components/custom-slider/custom-slider.component';
import { LoadingDirective } from '@shared/components/loading/loading.directive';
import { LoadingService } from '@shared/components/loading/loading.service';
import { IProduct, IProductGroup } from '@shared/common_types/interfaces';
import { ItemComponent } from './item/item.component';
import { LoadingIndicator } from './types/products';
import { SearchPipe } from '../../admin/shared/pipes/search.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [
    SearchInputComponent,
    CustomSliderComponent,
    LoadingDirective,
    NgxPaginationModule,
    ItemComponent,
    CommonModule,
    SearchPipe,
  ]
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
