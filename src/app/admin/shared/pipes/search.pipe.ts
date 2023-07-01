import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '@shared/common_types/interfaces';

@Pipe({
  name: 'searchProducts',
})
export class SearchPipe implements PipeTransform {
  public transform(products: IProduct[], search = ''): IProduct[] {
    if (!search.trim()) {
      return products;
    }

    return products.filter(product => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
