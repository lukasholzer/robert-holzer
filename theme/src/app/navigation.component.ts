import {Component, ElementRef} from 'mojiito-core';

@Component({ selector: '.navigation--main' })
export class NavigationComponent {

  private el: HTMLElement; // HTMLElement of Navigation
  private elSize = 340; // width of the element approximately (need for flex animation)

  private startNavigation = false;
  private ticking = false;


  constructor(private elementRef: ElementRef) {

    this.el = this.elementRef.nativeElement as HTMLElement;

    this.onScroll();
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScroll, <any>{ passive: true });
  }

  onScroll(): void {

    if (!this.ticking) {
      requestAnimationFrame(() => { this.calculate(); });
      this.ticking = true;
    }
  }

  calculate(): void {


    this.resizeNavigation();


    this.ticking = false;
  }

  resizeNavigation() {
    let offset = window.pageYOffset;
    let limit = 500; // range of transforming
    const min = 0; // min scale
    const max = 1; // max scale

    let calc: number = 1 - (offset / limit);

    calc += 1.5; // add offset

    calc = (calc > max) ? max : calc; // max value
    calc = (calc < min) ? min : calc; // min

    let size = this.elSize * calc;

    this.el.style.transform = `scale(${calc})`;
    this.el.style.width = `${size}px`;

    if (!(calc == max || calc == min)) {
      this.animateItems(calc);
      this.checkAnimationState(calc);
    }

    if (offset > 2000) {
      this.checkAnimationState(calc);
    }

  }

  checkAnimationState(calc: number) {
    // start animation
    if (calc < 1) {
      this.el.classList.remove('navigation--fixed');
    }

    if (calc <= 0.28) {
      this.el.classList.add('navigation--fixed');
    }
  }

  animateItems(calc: number) {
    const items = this.el.querySelectorAll('.navigation-list__item') as NodeListOf<HTMLElement>;

    Array.prototype.slice.call(items)
      .map((item: HTMLElement, n: number) => {
        let translate = calc * 50;

        // Even or odd push up or down
        if ((n % 2) === 0) {
          item.style.transform = `translateY(${(50 - translate)}%)`;
        } else {
          item.style.transform = `translateY(${-(50 - translate)}%)`;
        }
    });
  }
}
