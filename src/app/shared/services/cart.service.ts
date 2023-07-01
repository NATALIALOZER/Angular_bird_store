import { Injectable } from '@angular/core';
import { IProduct } from '../common_types/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public items: IProduct[] = [];

  public addToCart(product: IProduct, q: string): void {
    let isInCart = undefined;
    if (this.items) {
      isInCart = this.items.find((item: IProduct) => product.id === item.id);
    }
    product = { ...product, quantity: Number(q) };
    if (isInCart) {
      this.removeFromCart(product);
    } else {
      this.items.push(product);
      localStorage.setItem('ItemsInCart', JSON.stringify(this.items));
    }
  }

  public removeFromCart(product: IProduct): void {
    this.items = this.items.filter((item: IProduct) => item.id !== product.id);
    localStorage.setItem('ItemsInCart', JSON.stringify(this.items));
  }

  public getItems(): IProduct[] {
    const cartData = JSON.parse(localStorage.getItem('ItemsInCart') as string);
    this.items = cartData || [];
    return cartData;
  }

  public getProduct(product: IProduct): IProduct | undefined {
    return this.items
      ? this.items.find(item => item.id === product.id)
      : undefined;
  }

  public clearCart(): IProduct[] {
    this.items = [];
    localStorage.setItem('ItemsInCart', JSON.stringify(this.items));
    return this.items;
  }
}
