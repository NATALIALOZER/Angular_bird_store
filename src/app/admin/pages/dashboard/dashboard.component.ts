import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {Product} from "../../../models/product.model";
import {Subscription} from "rxjs";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  // @ts-ignore
  pSubscription: Subscription;
  // @ts-ignore
  delSubscription: Subscription;
  public searchStr = ''

  constructor( private productService: ProductService,
               private alert: AlertService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    })
  }

  remove(id: string | undefined) {
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
