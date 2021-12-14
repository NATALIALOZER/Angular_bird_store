import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {Subscription} from "rxjs";
import {AlertService} from "../../shared/services/alert.service";
import { Product } from '../../../shared/models/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  pSubscription: Subscription = new Subscription();
  delSubscription: Subscription = new Subscription();
  public searchStr = ''

  constructor( private productService: ProductService,
               private alert: AlertService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    })
  }

  remove(id: string ) {
    if (id != null) {
      this.productService.remove(id).subscribe(() => {
        this.products = this.products.filter(product => product.id !== id)
        this.alert.danger("Товар видалено")
      })
    }
  }

  ngOnDestroy(): void {
    if (this.pSubscription) {
      this.pSubscription.unsubscribe()
    }
    if (this.delSubscription) {
      this.delSubscription.unsubscribe()
    }
  }
}
