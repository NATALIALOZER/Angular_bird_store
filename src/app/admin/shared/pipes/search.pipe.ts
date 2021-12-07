import {Pipe, PipeTransform} from "@angular/core";
import {Product} from "../../../models/product.model";

@Pipe({
  name: 'searchProducts'
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], search = ''): Product[] {
    if (!search.trim()) {
      return products;
    }

    return products.filter(product => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    })
  }
}
