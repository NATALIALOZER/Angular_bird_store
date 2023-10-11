import { createAction, props } from '@ngrx/store';
import { IProduct } from '@shared/common_types/interfaces';

export const loadProducts = createAction(
  '[Products] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: IProduct[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: Error }>()
);
