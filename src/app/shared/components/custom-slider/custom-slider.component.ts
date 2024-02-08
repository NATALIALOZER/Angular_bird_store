import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IPageSizeParams } from './types/slider.interface';

@Component({
  selector: 'app-custom-slider',
  standalone: true,
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.scss'],
  imports: [FormsModule, MatSliderModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSliderComponent {
  @Input() public value = 5;
  @Output() public changePageCapacity = new EventEmitter<IPageSizeParams>();

  /*slider*/
  public disabled = false;
  public max = 35;
  public min = 5;
  public step = 15;
  public thumbLabel = false;
  public vertical = false;

  public changePageSize(): void {
    this.changePageCapacity.emit({
      page: 1,
      itemsPerPage: Number(this.value),
    });
  }
}
