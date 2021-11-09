import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import {AppRoutingModule} from "../app-routing.module";
import { ItemComponent } from './components/item/item.component';
import {MaterialModule} from "../material/material.module";
import {ModelModule} from "../models/model.module";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    ItemComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    ModelModule,
    HttpClientModule
  ]
  ,
  exports: [
    ItemComponent,
    HttpClientModule,
  ]
})
export class SharedModule { }
