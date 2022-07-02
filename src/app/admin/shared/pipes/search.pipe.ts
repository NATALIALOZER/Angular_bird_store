import {Pipe, PipeTransform} from "@angular/core";
import { Product } from '../../../shared/models/interfaces';

@Pipe({
  name: 'searchProducts'
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], search = ''): Product[] {
    console.log('search.pipe: ', search)
    console.log('search.pipe products: ', products)
    if (!search.trim()) {
      console.log('no str')
      return products;
    }

    return products.filter(product => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    })
  }
}
