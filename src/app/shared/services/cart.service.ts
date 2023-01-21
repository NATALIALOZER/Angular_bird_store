import { Injectable } from '@angular/core';
import { Product } from '../common_types/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public items: Product[] = [];

  public addToCart(product: Product, q: string): void {
    let isInCart = undefined;
    if (this.items) {
      isInCart = this.items.find((item: Product) => product.id === item.id);
    }
    product = { ...product, quantity: Number(q) };
    if (isInCart) {
      this.removeFromCart(product);
    } else {
      this.items.push(product);
      localStorage.setItem('ItemsInCart', JSON.stringify(this.items));
    }
  }

  public removeFromCart(product: Product): void {
    this.items = this.items.filter((item: Product) => item.id !== product.id);
    localStorage.setItem('ItemsInCart', JSON.stringify(this.items));
  }

  public getItems(): Product[] {
    const cartData = JSON.parse(localStorage.getItem('ItemsInCart') as string);
    this.items = cartData || [];
    return cartData;
  }

  public getProduct(product: Product): Product | undefined {
    return this.items
      ? this.items.find(item => item.id === product.id)
      : undefined;
  }

  public clearCart(): Product[] {
    this.items = [];
    localStorage.setItem('ItemsInCart', JSON.stringify(this.items));
    return this.items;
  }
}
