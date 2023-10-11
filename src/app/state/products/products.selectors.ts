import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './products-state.interface';


export const selectAllProducts = createSelector(
  createFeatureSelector('productsEntries'),
  (state: ProductState) => state.products)
