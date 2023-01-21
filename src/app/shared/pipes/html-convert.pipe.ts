import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'htmlConvert',
})
export class HtmlConvertPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  public transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
