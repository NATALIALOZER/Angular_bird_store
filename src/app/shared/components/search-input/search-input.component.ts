import { ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { ButtonSize } from '@shared/components/button/button';
import { MatInputModule } from '@angular/material/input';
import { NgStyle } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  imports: [MatInputModule, NgStyle, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  @Input() public checked = false;
  @Output() public searchEvent = new EventEmitter<string>();

  public ButtonSize: typeof ButtonSize = ButtonSize;
}
