import { Component, ElementRef } from 'mojiito-core';
const imagesLoaded = require('imagesloaded');
const isotope = require('isotope-layout');

interface IFilterOptions {
  holder: string;
  item: string;
  column?: string;
  gutter?: string;
}

@Component({
selector : '[data-filter]'
})
export class FilterComponent {

  private element: HTMLElement;
  private content: HTMLElement;
  private nav: NodeListOf<Element>;
  private navActive: HTMLElement;

  private _iso: any;

  constructor(private elementRef: ElementRef) {

    const element = this.elementRef.nativeElement as HTMLElement;
    const options = JSON.parse(element.getAttribute('data-filter')) as IFilterOptions;
    this.content = element.querySelector(options.holder) as HTMLElement;
    this.nav = element.querySelectorAll('[data-filter-nav]') as NodeListOf<Element>;

    this._iso = new isotope(this.content, {
      itemSelector : options.item,
      percentPosition: true,
      stamp: '.sidenav',
      masonry : {
        columnWidth : options.column,
        gutter: options.gutter,
      },
      filter: '*'
    });

    const imgLoaded = imagesLoaded(this.content);

    imgLoaded.on('progress', (instance: any, image: any) => {
      this._iso.layout();
    });

    for (let i = 0, max = this.nav.length; i < max; i++) {
      const navItem = this.nav[i] as HTMLElement;

      if (navItem.classList.contains('is-active')) {
        this.navActive = navItem;
      }

      navItem.addEventListener('click', (event: Event) => {
        event.preventDefault();
        const active = event.target as HTMLElement;
        const prop = active.getAttribute('data-filter-nav');
        this.toggleActiveNavigationElement(active);
        this.filterItems(prop);
      });
    }
  }

  private toggleActiveNavigationElement(active: HTMLElement) {
    this.navActive.classList.remove('is-active');
    this.navActive = active;
    this.navActive.classList.add('is-active');
  }

  private filterItems(filterProp: string) {
    if (filterProp === '*') {
      this._iso.arrange({ filter: '*' });
      return;
    }

    this._iso.arrange({
      filter: function (item: HTMLElement) {
        const cmp = item.getAttribute('data-filter-item');
        return (cmp === filterProp);
      }
    });
  }



}
