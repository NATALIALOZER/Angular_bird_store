import {NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ProductsComponent} from "./pages/products-page/products.component";
import { CartComponent } from './pages/cart-page/cart.component';
import { ProductComponent } from './pages/product-page/product.component';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {SharedModule} from "./shared/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ProductsComponent,
    CartComponent,
    ProductComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      SharedModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
