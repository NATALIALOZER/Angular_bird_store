import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '@shared/common_types/interfaces';

@Pipe({
  name: 'searchProducts',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  public transform(products: IProduct[] | null, search = ''): IProduct[] {
    if (!products) return [];

    if (!search.trim()) return products;

    return products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }
}
