import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonSize } from '@shared/components/button/button';
import { ButtonComponent } from '@shared/components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
  imports: [ButtonComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfoComponent {
  public ButtonSize: typeof ButtonSize = ButtonSize;
}
