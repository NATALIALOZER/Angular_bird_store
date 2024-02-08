import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

import { BehaviorSubject } from 'rxjs';

import { ProductsService } from '../../../pages/products-page/products.service';
import { AlertService } from '../../shared/services/alert.service';
import { IProduct } from '@shared/common_types/interfaces';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [FormsModule, NgIf, SearchPipe, NgForOf, RouterLink, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  public products$ = new BehaviorSubject<IProduct[]>([]);
  public searchStr = '';

  private alert = inject(AlertService);
  private productService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadData();
  }

  public remove(id: string): void {
    this.productService
      .remove(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadData();
        this.alert.danger('Товар видалено');
      });
  }

  private loadData(): void {
    this.productService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products: IProduct[]) => this.products$.next(products));
  }
}
