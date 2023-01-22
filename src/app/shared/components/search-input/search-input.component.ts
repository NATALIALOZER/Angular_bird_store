import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { ButtonSize } from '@shared/components/button/button';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  @Input() public checked = false;
  @Output() public searchEvent = new EventEmitter<string>();

  public ButtonSize: typeof ButtonSize = ButtonSize;

  public searchProducts(value: string): void {
    this.searchEvent.emit(value);
  }
}
