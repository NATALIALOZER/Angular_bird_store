import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProduct, IProductGroup } from '@shared/common_types/interfaces';
import { CartState } from './cart-state.interface';

export const selectCountProducts = createSelector(
  createFeatureSelector('cartEntries'),
  (state: CartState) => {
    return state?.items?.length;
  }
);

export const selectTotalPrice = createSelector(
  createFeatureSelector('cartEntries'),
  (state: CartState) => {
    let totalPrice = 0;
    state?.items?.forEach((product: IProduct) => (totalPrice += product.price));
    return totalPrice;
  }
);

export const selectGroupedCartEntries = createSelector(
  createFeatureSelector('cartEntries'),
  (state: CartState) => {
    const map: Map<string, IProductGroup> = new Map();

    state?.items?.forEach((product: IProduct) => {
      if (map.get(product.id)) {
        (map.get(product.id) as IProductGroup).count++;
      } else {
        map.set(product.id, { product, count: 1 });
      }
    });

    const sortedMap = new Map([...map.entries()].sort());
    return Array.from(sortedMap.values());
  }
);
