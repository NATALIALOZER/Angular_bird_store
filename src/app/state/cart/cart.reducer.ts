import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { Product } from '@shared/common_types/interfaces';

export const cartFeatureKey = 'cart';

export const initialCartState: Product[] = [];

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.clearCart, () => []),

  on(
    CartActions.addProduct,
    (entries, req: { product: Product; quantity: string }) => {
      const entriesClone: Product[] = JSON.parse(JSON.stringify(entries));
      entriesClone.push(req.product);
      for (const _ of Array(+req.quantity - 1).keys()) {
        entriesClone.push(req.product);
      }
      return entriesClone;
    }
  ),

  on(CartActions.removeProduct, (entries, product) => {
    const entriesClone: Product[] = JSON.parse(JSON.stringify(entries));
    return entriesClone.filter(item => item.id !== product.id);
  })
);
