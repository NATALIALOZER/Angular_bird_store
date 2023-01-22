import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ItemComponent } from '../pages/products-page/item/item.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { HtmlConvertPipe } from './pipes/html-convert.pipe';
import { CounterDirective } from './directives/counter.directive';
import { CustomSliderComponent } from './components/custom-slider/custom-slider.component';
import { LoaderComponent } from './components/loading/loader/loader.component';
import { LoadingDirective } from './components/loading/loading.directive';
import { ButtonComponent } from './components/button/button.component';
import { ButtonCheckboxComponent } from './components/button-checkbox/button-checkbox.component';

@NgModule({
  declarations: [
    ItemComponent,
    SearchInputComponent,
    HtmlConvertPipe,
    CounterDirective,
    CustomSliderComponent,
    LoaderComponent,
    LoadingDirective,
    ButtonComponent,
    ButtonCheckboxComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ItemComponent,
    HttpClientModule,
    MaterialModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule,
    SearchInputComponent,
    CustomSliderComponent,
    LoadingDirective,
  ],
})
export class SharedModule {}
