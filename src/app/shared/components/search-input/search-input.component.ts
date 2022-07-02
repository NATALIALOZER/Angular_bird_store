import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  @Input() public checked: boolean = false;
  @Output() public searchEvent = new EventEmitter<string>();

  constructor() { }

  public ngOnInit(): void {
  }

  public searchProducts(value: string): void {
    this.searchEvent.emit(value);
  }
}
