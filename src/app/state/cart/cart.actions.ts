import { createAction, props } from '@ngrx/store';
import { Product } from '@shared/common_types/interfaces';

/*export const loadCarts = createAction(
  '[Cart] Load Carts'
);*/

export const clearCart = createAction('[Cart] Clear Cart');
export const addProduct = createAction(
  '[Cart] Add Product',
  props<{ product: Product; quantity: string }>()
);
export const removeProduct = createAction(
  '[Cart] Remove Product',
  props<Product>()
);
