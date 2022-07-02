import {NgModule} from '@angular/core'
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./pages/products-page/products.component";
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {CartComponent} from "./pages/cart-page/cart.component";
import { ProductInfoComponent } from './pages/product-info-page/product-info.component';
import { PaymentComponent } from './pages/payment-page/payment.component';

  const routes: Routes = [
    {
      path: '', component: MainLayoutComponent, children: [
        {
          path:'', redirectTo: '/', pathMatch: 'full'
        },
        {
          path: '',
          component: ProductsComponent
        },
        {
          path: 'product/:id',
          component: ProductInfoComponent
        },
        {
          path: 'cart',
          component: CartComponent
        },
        {
          path: 'payment',
          component: PaymentComponent
          },
      ]
    },
    {
      path: 'admin',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    }
  ]


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy:PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
