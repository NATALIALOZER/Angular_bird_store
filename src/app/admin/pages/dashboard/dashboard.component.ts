import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/product.service";
import {Product} from "../../../models/product.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  // @ts-ignore
  pSubscription: Subscription;

  constructor( private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    })
  }

  ngOnDestroy(): void {
    if (this.pSubscription) {
      this.pSubscription.unsubscribe()
    }
  }

  remove(id: string | undefined) {

  }
}
