import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './pages/products-page/products.component';
import { CartComponent } from './pages/cart-page/cart.component';
import { ProductInfoComponent } from './pages/product-info-page/product-info.component';
import { MainLayoutComponent } from '@shared/components/layouts/main-layout/main-layout.component';
import { SharedModule } from '@shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@shared/interceptors/auth.interceptor';
import { AdminModule } from './admin/admin.module';
import { PaymentComponent } from './pages/payment-page/payment.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './state/cart/cart.reducer';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ProductsComponent,
    CartComponent,
    ProductInfoComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AdminModule,
    // EffectsModule.forFeature([CartEffects]),
    StoreModule.forRoot({ cartEntries: cartReducer }),
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
