import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonSize } from '@shared/components/button/button';
import { MaterialModule } from '@shared/material/material.module';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  imports: [MaterialModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent {
  public ButtonSize: typeof ButtonSize = ButtonSize;
}
