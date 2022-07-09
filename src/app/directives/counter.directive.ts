import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[counterOf]',
})
export class CounterDirective implements OnChanges {
  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<CounterDirectiveContext>
  ) {}

  @Input('counterOf') counter!: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ngOnChanges(changes: SimpleChanges): void {
    this.container.clear();
    for (let i = 0; i < this.counter; i++) {
      this.container.createEmbeddedView(
        this.template,
        new CounterDirectiveContext(i + 1)
      );
    }
  }
}
class CounterDirectiveContext {
  constructor(public $implicit: any) {}
}
