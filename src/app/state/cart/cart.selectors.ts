import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product, ProductGroup } from '@shared/common_types/interfaces';

export const selectCountProducts = createSelector(
  createFeatureSelector('cartEntries'),
  (state: Product[]) => {
    return state.length;
  }
);

export const selectTotalPrice = createSelector(
  createFeatureSelector('cartEntries'),
  (state: Product[]) => {
    let totalPrice = 0;
    state.forEach((product: Product) => (totalPrice += product.price));
    return totalPrice;
  }
);

export const selectGroupedCartEntries = createSelector(
  createFeatureSelector('cartEntries'),
  (state: Product[]) => {
    const map: Map<string, ProductGroup> = new Map();

    state.forEach((product: Product) => {
      if (map.get(product.id)) {
        (map.get(product.id) as ProductGroup).count++;
      } else {
        map.set(product.id, { product, count: 1 });
      }
    });

    const sortedMap = new Map([...map.entries()].sort());
    return Array.from(sortedMap.values());
  }
);
