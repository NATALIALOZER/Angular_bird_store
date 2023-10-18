/*
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainLayoutComponent } from '@shared/layouts/main-layout/main-layout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@shared/interceptors/auth.interceptor';
import { AdminModule } from './admin/admin.module';
import { StoreModule } from '@ngrx/store';
import {
  cartReducer,
  metaReducerLocalStorage,
} from './state/cart/cart.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.prod';
import { ProductsEffects } from './state/products/products.effects';
import { EffectsModule } from '@ngrx/effects';
import { productsReducer } from './state/products/products.reducer';
import { NgxPaginationModule } from 'ngx-pagination';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

const ROOT_REDUCERS = {
  cartEntries: cartReducer,
  productsEntries: productsReducer
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    EffectsModule.forRoot([ProductsEffects]),
    StoreModule.forRoot(
      ROOT_REDUCERS,
      {metaReducers: [metaReducerLocalStorage]}
    ),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    NgxPaginationModule,
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
*/
