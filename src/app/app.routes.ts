import { Route } from '@angular/router';

import { MainLayoutComponent } from '@shared/layouts/main-layout/main-layout.component';
import { ProductsComponent } from './pages/products-page/products.component';
import { ProductInfoComponent } from './pages/product-info-page/product-info.component';
import { CartComponent } from './pages/cart-page/cart.component';
import { PaymentComponent } from './pages/payment-page/payment.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
      },
      {
        path: '',
        component: ProductsComponent,
      },
      {
        path: 'product/:id',
        component: ProductInfoComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes'),
  },
];
