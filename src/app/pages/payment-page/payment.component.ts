import { Component } from '@angular/core';
import { ButtonSize } from '@shared/components/button/button';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  public ButtonSize: typeof ButtonSize = ButtonSize;
}
