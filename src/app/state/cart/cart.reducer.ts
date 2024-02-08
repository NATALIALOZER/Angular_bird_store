import { ActionReducer, INIT, UPDATE, createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { IProduct } from '@shared/common_types/interfaces';
import { CartState } from './cart-state.interface';

export const cartFeatureKey = 'cart';

export const initialCartState: CartState = {
  items: [],
  status: '',
};

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.clearCart, (state: CartState) => ({ ...state, items: [] })),

  on(
    CartActions.addProduct,
    (state: CartState, req: { product: IProduct; quantity: string }) => {
      const entriesClone: CartState = JSON.parse(JSON.stringify(state));
      entriesClone.items.push(req.product);
      for (const _ of Array(+req.quantity - 1).keys()) {
        entriesClone.items.push(req.product);
      }
      return entriesClone;
    }
  ),

  on(CartActions.removeProduct, (state: CartState, product: IProduct) => {
    const entriesClone: CartState = JSON.parse(JSON.stringify(state));
    const clearArray = entriesClone.items?.filter(
      (item: IProduct) => item.id !== product.id
    );
    const currentProducts = entriesClone.items?.filter(
      (item: IProduct) => item.id === product.id
    );
    currentProducts.length = currentProducts.length - 1;
    entriesClone.items = clearArray.concat(currentProducts);

    return entriesClone;
  }),

  on(
    CartActions.removeAllEntriesOfProduct,
    (state: CartState, product: IProduct) => {
      const entriesClone: CartState = JSON.parse(JSON.stringify(state));
      entriesClone.items = entriesClone.items?.filter(
        (item: IProduct) => item.id !== product.id
      );
      return entriesClone;
    }
  ),

  on(CartActions.loadCart, (state: CartState) => {
    return { ...state, status: 'loading' };
  }),

  on(CartActions.loadCartSuccess, (state: CartState, cart) => {
    return {
      ...state,
      cart: cart,
      error: null,
      status: 'success',
    };
  }),

  on(CartActions.loadCartFailure, (state: CartState, error) => {
    return {
      ...state,
      error: error,
      status: 'error',
    };
  })
);

export const metaReducerLocalStorage = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    if (action.type === INIT || action.type == UPDATE) {
      const storageValue = localStorage.getItem('state');

      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem('state');
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem('cartEntries', JSON.stringify(nextState.cartEntries));
    return nextState;
  };
};
