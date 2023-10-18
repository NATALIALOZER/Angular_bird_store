import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../pages/products-page/products.service';
import { AlertService } from '../../shared/services/alert.service';
import { IProduct } from '@shared/common_types/interfaces';
import { WithDestroy } from '@shared/mixins/destroy';
import { takeUntil } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    FormsModule,
    NgIf,
    SearchPipe,
    NgForOf,
    RouterLink
  ]
})
export class DashboardComponent extends WithDestroy() implements OnInit {
  public products: IProduct[] = [];
  public searchStr = '';

  constructor(
    private productService: ProductsService,
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
