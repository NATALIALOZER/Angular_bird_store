import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { NgxPaginationModule } from 'ngx-pagination';

import { Store } from '@ngrx/store';
import { selectGroupedCartEntries } from '../../state/cart/cart.selectors';
import { selectAllProducts } from '../../state/products/products.selectors';
import { loadProducts } from '../../state/products/products.actions';

import { SearchInputComponent } from '@shared/components/search-input/search-input.component';
import { IPageSizeParams } from '@shared/components/custom-slider/types/slider.interface';
import { CustomSliderComponent } from '@shared/components/custom-slider/custom-slider.component';
import { IProduct, IProductGroup } from '@shared/common_types/interfaces';
import { ItemComponent } from './item/item.component';
import { SearchPipe } from '../../admin/shared/pipes/search.pipe';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [
    SearchInputComponent,
    CustomSliderComponent,
    NgxPaginationModule,
    ItemComponent,
    CommonModule,
    SearchPipe,
    MatInputModule,
  ],
})
export class ProductsComponent implements OnInit {
  public products$: Observable<IProduct[]>;
  public cartEntries$: Observable<IProductGroup[]>;

  /*paginator*/
  public value = 5;
  public page = 1;
  public productsPerPage: number = this.value;

  public search = '';

  private store = inject(Store);

  constructor() {
    this.store.dispatch(loadProducts());
    this.products$ = this.store.select(selectAllProducts);
    this.cartEntries$ = this.store.select(selectGroupedCartEntries);
  }

  ngOnInit(): void {}

  public searchItem(newItem: string): void {
    this.page = 1;
    this.search = newItem;
  }

  public onPagination(data: IPageSizeParams): void {
    this.productsPerPage = data.itemsPerPage;
    this.page = data.page;
  }

  setget() {
    console.log('asdasd');
  }
}
