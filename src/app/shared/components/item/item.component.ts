import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/interfaces';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() public product!: Product;
  @Input() public value: number = 5;

  constructor() { }

  ngOnInit(): void {

  }

}
