import { Component, Input } from '@angular/core';
import { ButtonSize, ButtonType } from '@shared/components/button/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public icon_name = '';
  @Input() public checked = false;
  @Input() public disabled = false;
  @Input() public size: ButtonSize = ButtonSize.MEDIUM;
  @Input() public buttonType: ButtonType = ButtonType.DEFAULT;
}
