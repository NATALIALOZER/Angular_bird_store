import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../shared/services/product.service";
import { Observable } from "rxjs";
import { Product } from '../../shared/models/interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  public products$!: Observable<Product[]>

  /*slider*/
  disabled = false;
  max = 35;
  min = 5;
  step = 15;
  thumbLabel = false;
  value = 5;
  vertical = false;

  /*paginator_native*/
  public productsArray: Product[] = [];
  public page: string | number = 1;
  public productsPerPage = this.value;


  constructor( private productService: ProductService) {
    this.products$ = this.productService.getAll()
  }

  public ngOnInit(): void {
    this.products$.subscribe(res => {
        this.productsArray = res;
      }
    );
  }

  public changePageSize() {
    this.productsPerPage = Number(this.value);
    this.page = 1;
  }
}
