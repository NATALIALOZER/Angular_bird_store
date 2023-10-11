import { Component } from '@angular/core';
import { ButtonSize, ButtonType } from '@shared/components/button/button';
import { selectTotalPrice } from '../../../../state/cart/cart.selectors';
import { Store } from '@ngrx/store';

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

  public countCart$ = this.store.select(selectTotalPrice);

  constructor(private store: Store) {
  }
}
