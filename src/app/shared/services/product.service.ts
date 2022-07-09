import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { FbCreateResponse, Product } from '../models/interfaces';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  create(product: Product): Observable<Product> {
    return this.http
      .post<Product>(`${environment.fbDbUrl}/products.json`, product)
      .pipe(
        map((response: FbCreateResponse) => {
          return { ...product, id: response.name, name: product.name };
        })
      );
  }

  getAll(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${environment.fbDbUrl}/products.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object.keys(response).map(key => ({
            ...response[key],
            id: key,
            name: response[key].name,
          }));
        })
      );
  }

  getById(id: string): Observable<Product> {
    return this.http
      .get<Product>(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(
        map((product: Product) => {
          return { ...product, id, name: product.name };
        })
      );
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(
      `${environment.fbDbUrl}/products/${product.id}.json`,
      product
    );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/products/${id}.json`);
  }
}
