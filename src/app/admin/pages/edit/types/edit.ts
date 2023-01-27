import { FormControl } from '@angular/forms';

export interface IEditForm {
  name: FormControl<string | null>;
  price: FormControl<number | null>;
}
