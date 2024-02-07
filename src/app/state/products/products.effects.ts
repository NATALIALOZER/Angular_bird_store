import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, from, map, of, switchMap } from 'rxjs';

import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
} from './products.actions';
import { ProductsService } from '../../pages/products-page/products.service';
import { IProduct } from '@shared/common_types/interfaces';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        from(this.productsService.getAll()).pipe(
          map((products: IProduct[]) =>
            loadProductsSuccess({ products: products })
          ),
          catchError((error: Error) => of(loadProductsFailure({ error })))
        )
      )
    )
  );
}
