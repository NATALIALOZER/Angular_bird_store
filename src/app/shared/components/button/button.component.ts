import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonSize, ButtonType } from '@shared/components/button/button';
import { NgClass, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [NgClass, MatIconModule, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() public icon_name = '';
  @Input() public checked = false;
  @Input() public disabled = false;
  @Input() public size: ButtonSize = ButtonSize.MEDIUM;
  @Input() public buttonType: ButtonType = ButtonType.DEFAULT;
}
