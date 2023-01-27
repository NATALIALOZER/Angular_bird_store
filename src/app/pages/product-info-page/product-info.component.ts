import { Component } from '@angular/core';
import { ButtonSize } from '@shared/components/button/button';

@Component({
  selector: 'app-product',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent {
  public ButtonSize: typeof ButtonSize = ButtonSize;
}
