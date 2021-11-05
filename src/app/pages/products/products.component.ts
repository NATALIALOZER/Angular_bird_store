import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {StaticDatasource} from "../../models/static.datasource";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  /*colsNum: number = 1;*/


  /*slider*/
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 35;
  min = 5;
  showTicks = false;
  step = 15;
  thumbLabel = false;
  value = 5;
  vertical = false;
  // MatPaginator Inputs
  length = 35;
  /*pageSizeOptions: number[] = [5, 20, 35];*/
  pageEvent!: PageEvent;

  /*paginator_native*/
  public productsArray: Product[] = [];
  public productsPerPage = this.value;
  public selectedPage = 1;

  constructor(private dataSource: StaticDatasource) {
    dataSource.getProducts().subscribe(data => {
      this.productsArray = data;
    });
  }

  ngOnInit(): void {
    /*this.colsNum = */
  }

  /*paginator_native*/
  get products(): Product[] {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.productsArray.slice(pageIndex, pageIndex + this.productsPerPage);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }

  changePageSize() {
    this.productsPerPage = Number(this.value);
    this.changePage(1);
  }

  get pageCount(): number {
    return Math.ceil(this.productsArray.length / this.productsPerPage)
  }
}
