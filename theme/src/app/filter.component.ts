import { Component, ElementRef } from 'mojiito-core';

export interface IFilterOptions {
  itemSelector: string;
  filterSelector: string;
  filterProperty: string;
}

@Component({
  selector: '[data-filter]'
})
export class FilterComponent {

  static ACTIVE_CLASS: string = 'is-active';
  static HIDDEN_CLASS: string = 'is-hidden';

  private _options: IFilterOptions;

  private _filters: NodeListOf<HTMLElement>;
  private _elements: NodeListOf<HTMLElement>;
  private _active: HTMLElement;

  constructor(private elementRef: ElementRef) {

    const _el = elementRef.nativeElement;
    this._options = JSON.parse(_el.getAttribute('data-filter')) as IFilterOptions;


    this._filters = _el.querySelectorAll(this._options.filterSelector);
    this._elements = _el.querySelectorAll(this._options.itemSelector);

    for (let i = 0, max = this._filters.length; i < max; i++) {
      const filter = this._filters[i] as HTMLElement;
      if (filter.classList.contains(FilterComponent.ACTIVE_CLASS)) {
        this._active = filter;
      }

      filter.addEventListener('click', (event: Event) => {
        event.preventDefault();
        this.setActive(filter);
        this.filter();
      });
    }
  }

  setActive(neues: HTMLElement): void {
    this._active.classList.remove(FilterComponent.ACTIVE_CLASS);
    this._active = neues;
    neues.classList.add(FilterComponent.ACTIVE_CLASS);
  }

  filter(): void {
    for (let i = 0, max = this._elements.length; i < max; i++) {
      const el = this._elements[i] as HTMLElement;

      if (el.getAttribute(this._options.filterProperty) === this._active.getAttribute(this._options.filterProperty)) {
        el.classList.remove(FilterComponent.HIDDEN_CLASS);
      } else {
        el.classList.add(FilterComponent.HIDDEN_CLASS);
      }
    }

  }

}
