import { ValidatorFn } from '@angular/forms';

export interface ICreateForm {
  name: Array<null | string | ValidatorFn>;
  price: Array<null | number | ValidatorFn>;
  description: Array<null | string | ValidatorFn>;
  imageUrl: Array<null | string>;
}

export interface ImageSnippet {
  file?: File;
  src: string | ArrayBuffer | null | undefined;
}
