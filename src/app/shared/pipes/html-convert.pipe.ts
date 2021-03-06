import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'htmlConvert',
})
export class HtmlConvertPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
