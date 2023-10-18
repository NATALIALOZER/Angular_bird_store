import { Component } from '@angular/core';
import { ButtonSize, ButtonType } from '@shared/components/button/button';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  public ButtonSize: typeof ButtonSize = ButtonSize;
  public ButtonType: typeof ButtonType = ButtonType;
  /*checkbox*/
  public checked = false;
  public search = '';
}
