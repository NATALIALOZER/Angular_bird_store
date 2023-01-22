import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ButtonSize } from '@shared/components/button/button';

@Component({
  selector: 'app-button-checkbox',
  templateUrl: './button-checkbox.component.html',
  styleUrls: ['./button-checkbox.component.scss'],
})
export class ButtonCheckboxComponent {
  @Input() public checked = false;
  @Input() public control!: FormControl<boolean>;

  public ButtonSize: typeof ButtonSize = ButtonSize;
}
