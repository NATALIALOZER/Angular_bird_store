import { FormControl } from '@angular/forms';

export interface IItemForm {
  quantity: FormControl<number>;
  checkedCart: FormControl<boolean>;
}
