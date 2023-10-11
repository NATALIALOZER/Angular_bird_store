import { IProduct } from '@shared/common_types/interfaces';

export interface CartState {
  items: IProduct[];
  status: 'pending' | 'loading' | 'error' | 'success' | string;
}
