import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ItemComponent } from './components/item/item.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { HtmlConvertPipe } from './pipes/html-convert.pipe';
import { CounterDirective } from '../directives/counter.directive';
import { CustomSliderComponent } from './components/custom-slider/custom-slider.component';

@NgModule({
  declarations: [ItemComponent, SearchInputComponent, HtmlConvertPipe, CounterDirective, CustomSliderComponent],
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
  ],
})
export class SharedModule {}
