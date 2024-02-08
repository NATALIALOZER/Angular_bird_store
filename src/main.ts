import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom, InjectionToken, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authInterceptor } from '@shared/interceptors/auth.interceptor';
import {
  cartReducer,
  metaReducerLocalStorage,
} from './app/state/cart/cart.reducer';
import { productsReducer } from './app/state/products/products.reducer';
import { ProductsEffects } from './app/state/products/products.effects';

export const ENV = new InjectionToken('environment');

// const INTERCEPTOR_PROVIDER: Provider = {
//   provide: HTTP_INTERCEPTORS,
//   multi: true,
//   useClass: AuthInterceptor,
// };

const ROOT_REDUCERS = {
  cartEntries: cartReducer,
  productsEntries: productsReducer,
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimations(),
    provideNoopAnimations(),
    provideEffects([ProductsEffects]),
    provideStore(ROOT_REDUCERS, { metaReducers: [metaReducerLocalStorage] }),
    provideStoreDevtools({
      logOnly: environment.production,
    }),
    { provide: ENV, useValue: environment },
  ],
}).catch(error => console.log(error));
