import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {FbCreateResponse} from "./interfaces";

@Injectable({providedIn: "root"})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  create(product: Product): Observable<Product>{

    return this.http.post<Product>(`${environment.fbDbUrl}/products.json`, product)
      // @ts-ignore
      .pipe(map((response: FbCreateResponse) => {
        return { ...product,
          id: response.name,
          name: product.name,
        };
    }))
  }

  getAll(): Observable<Product[]> {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object.keys(response)
          .map(key => ({...response[key],
          id: key,
          name: response[key].name}
          ))
      }))
  }}



