import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../../material/material.module";
import {ModelModule} from "../../models/model.module";
import {CounterDirective} from "../../directives/counter.directive";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ModelModule,
    ],
    exports: [
        CounterDirective
    ],
    declarations: [ CounterDirective]
})
export class ProductsModule { }
