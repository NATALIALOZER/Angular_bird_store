import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../models/product.model";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() public product!: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
