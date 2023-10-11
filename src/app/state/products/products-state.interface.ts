import { IProduct } from '@shared/common_types/interfaces';

export interface ProductState {
  products: IProduct[];
  error: null;
  status: 'pending' | 'loading' | 'error' | 'success' | string;
}
