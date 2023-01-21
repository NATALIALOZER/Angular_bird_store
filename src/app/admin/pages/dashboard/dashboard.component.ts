import { Component, OnInit } from '@angular/core';
import { ProductService } from '@shared/services/product.service';
import { AlertService } from '../../shared/services/alert.service';
import { Product } from '@shared/common_types/interfaces';
import { WithDestroy } from '@shared/mixins/destroy';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends WithDestroy() implements OnInit {
  public products: Product[] = [];
  public searchStr = '';

  constructor(
    private productService: ProductService,
    private alert: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.productService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => (this.products = products));
  }

  public remove(id: string): void {
    if (!id) {
      this.productService
        .remove(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.products = this.products.filter(product => product.id !== id);
          this.alert.danger('Товар видалено');
        });
    }
  }
}
