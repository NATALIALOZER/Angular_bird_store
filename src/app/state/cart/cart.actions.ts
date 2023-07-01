import { createAction, props } from '@ngrx/store';
import { IProduct } from '@shared/common_types/interfaces';

export const clearCart = createAction('[Cart] Clear Cart');
export const addProduct = createAction(
  '[Cart] Add Product',
  props<{ product: IProduct; quantity: string }>()
);

export const removeProduct = createAction(
  '[Cart] Remove One Product',
  props<IProduct>()
);

export const removeAllProducts = createAction(
  '[Cart] Remove All Products',
  props<IProduct>()
);
