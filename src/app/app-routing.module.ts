import {NgModule} from '@angular/core'
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./pages/products-page/products.component";
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {ProductComponent} from "./pages/product-page/product.component";
import {CartComponent} from "./pages/cart-page/cart.component";
import {config} from "rxjs";

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
          path: 'product-page/:id',
          component: ProductComponent
        },
        {
          path: 'cart-page',
          component: CartComponent
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
