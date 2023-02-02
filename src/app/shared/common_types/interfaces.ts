export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity?: number;
}

export interface ProductGroup {
  product: Product;
  count: number;
}
