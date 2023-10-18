import {
  Directive,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appCounterOf]',
  standalone: true,
})
export class CounterDirective implements OnChanges {
  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<CounterDirectiveContext>
  ) {}

  @Input('appCounterOf') counter!: number;

  public ngOnChanges(): void {
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
  constructor(public $implicit: number) {}
}
