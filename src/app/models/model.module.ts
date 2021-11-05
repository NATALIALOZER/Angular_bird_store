import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StaticDatasource} from "./static.datasource";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [StaticDatasource]
})
export class ModelModule { }
