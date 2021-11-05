import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {ProductsComponent} from "./pages/products/products.component";
import {FormsModule} from "@angular/forms";
import {ModelModule} from "./models/model.module";
import {ProductsModule} from "./pages/products/products.module";
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {SharedModule} from "./shared/shared.module";


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
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ModelModule,
    SharedModule,
    ProductsModule
  ],
  exports:[
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
