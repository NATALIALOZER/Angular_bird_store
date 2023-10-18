import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonSize } from '@shared/components/button/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-button-checkbox',
  standalone: true,
  templateUrl: './button-checkbox.component.html',
  styleUrls: ['./button-checkbox.component.scss'],
  imports: [
    MatCheckboxModule,
    ButtonComponent,
    ReactiveFormsModule
  ]
})
export class ButtonCheckboxComponent {
  @Input() public iconName = '';
  @Input() public buttonSize: ButtonSize = ButtonSize.SMALL;
  @Input() public checked = false;
  @Input() public sharedVal: unknown;
  @Input() public control: FormControl<boolean> = new FormControl();
  @Output() public sharedChanges: EventEmitter<unknown> =
    new EventEmitter<unknown>();

  public change(newValue: unknown): void {
    this.sharedVal = newValue;
    newValue = newValue !== 0 ? newValue : '';
    this.sharedChanges.emit(newValue);
  }
}
