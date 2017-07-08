import { Component, ElementRef } from 'mojiito-core';
import 'isotope-layout';

declare var Isotope: {
  prototype: IsotopeLibrary.Isotope;
  new (selector: string, options: IsotopeLibrary.IsotopeOptions) : IsotopeLibrary.Isotope;
  new (element: HTMLElement, options: IsotopeLibrary.IsotopeOptions): IsotopeLibrary.Isotope;
  data(element: HTMLElement | string): IsotopeLibrary.Isotope;
};


@Component({
  selector: '[data-filter]'
})
export class FilterComponent {

  constructor(private elementRef: ElementRef) {

    const element = this.elementRef.nativeElement as HTMLElement;
    const isotope = new Isotope(element, {
      itemSelector: '[data-filter-item]',
      layoutMode: 'fitRows',
      filter: '*'
    });

  }

}
