import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { loadProducts, loadProductsFailure, loadProductsSuccess } from './products.actions';
import { ProductsService } from '../../pages/products-page/products.service';
import { IProduct } from '@shared/common_types/interfaces';

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) { }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() => from(this.productsService.getAll()).pipe(
        tap((e) => console.log(e)),
        map((products: IProduct[]) => loadProductsSuccess({ products: products })),
        catchError((error: Error) => of(loadProductsFailure({ error })))
      ))
    )
  );
}