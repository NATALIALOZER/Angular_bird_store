import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Observable, Subject } from 'rxjs';
import { Product } from '../../shared/models/interfaces';
import { CartService } from '../../shared/services/cart.service';
import { IPageSizeParams } from '../../shared/components/custom-slider/slider.interface';
import { LoadingService } from '../../shared/components/loading/loading.service';
import { takeUntil } from 'rxjs/operators';

// contains identifiers of all loading indicators in this component
enum LoadingIndicator {
  OPERATOR,
  MANUAL,
  ASYNC_PIPE
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products$!: Observable<Product[]>;

  /*loader*/
  LoadingIndicator = LoadingIndicator;

  /*paginator_native*/
  public value = 5;
  public productsArray: Product[] = [];
  public page: string | number = 1;
  public productsPerPage: number = this.value;

  public search = '';

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    public loadingService: LoadingService,
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.products$ = this.productService.getAll();
  }

  public ngOnInit(): void {
    this.loadingService.doLoading(
        this.products$,
        this,
        LoadingIndicator.OPERATOR
    ).pipe( takeUntil(this.destroy$)
    ).subscribe(res => {
      this.productsArray = res;
    });
    this.cartService.getItems();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public searchItem(newItem: string): void {
    this.search = newItem;
  }

  public onPagination(data: IPageSizeParams): void {
    this.productsPerPage = data.itemsPerPage;
    this.page = data.page;
  }
}
