import { IProduct } from '@shared/common_types/interfaces';
import { CartState } from './cart/cart-state.interface';
import { ProductState } from './products/products-state.interface';

export interface AppState {
  cart: CartState;
  products: ProductState;
  item: IProduct;
}
