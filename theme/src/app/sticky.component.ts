import { Component, ElementRef } from 'mojiito-core';

@Component({
  selector: '[data-sticky]'
})
export class StickyComponent {

  static NAVIGATION_OFFSET_TOP: number = 100;
  static NAVIGATION_OFFSET_BOTTOM: number = 0;
  static STICKY_CLASS: string = 'is-sticky';

  private _referenceElement: HTMLElement;
  private _offsetTop: number;
  private _offsetBottom: number;

  private _fixed: boolean = false;

  private _element: Element;

  constructor(private _elementRef: ElementRef) {
    this._element = this._elementRef.nativeElement;
    this._offsetTop = parseInt(this._element.getAttribute('data-sticky-offsetTop')) || StickyComponent.NAVIGATION_OFFSET_TOP;
    this._offsetBottom = parseInt(this._element.getAttribute('data-sticky-offsetBottom')) || StickyComponent.NAVIGATION_OFFSET_BOTTOM;
    this._referenceElement = document.querySelector(`#${this._element.getAttribute('data-sticky')}`) as HTMLElement;

    this.setOffsets();

    // initial check if sticky
    this._checkSticky();

    this.onScroll();
    this.onScroll = this.onScroll.bind(this)
    window.addEventListener('scroll', this.onScroll, <any>{ passive: true });
  }

  setOffsets(): void {
    if (this._offsetBottom) {
      (this._element as HTMLElement).style.bottom = this._offsetBottom + 'px';
    }
    if (this._offsetTop) {
      (this._element as HTMLElement).style.top = this._offsetTop + 'px';
    }
  }

  onScroll(): void {
    requestAnimationFrame(() => {
      // this._checkSticky();

      if (this._fixed && this._checkSticky()) {
        this._element.classList.add(StickyComponent.STICKY_CLASS);
      } else {
        this._element.classList.remove(StickyComponent.STICKY_CLASS);
      }
    });
  }
  _checkSticky(): boolean {
    const _elHeight = this._element.clientHeight;
    const _refBounding = this._referenceElement.getBoundingClientRect();
    const _refOfTop = _refBounding.top - this._offsetTop; // if smaller then 1 fix it
    const _refOfBot = _refBounding.bottom - this._offsetBottom;
    const _botOff = _refOfBot - _elHeight // if negative then destroy fix
    console.log('Is fixed: ', this._fixed ,' Top Offset: ', _refOfTop, ' Bottom Offset: ', _botOff);
    // is not fixed container to small
    if (_refOfTop > 0 && _botOff < 0) {
      this._fixed = false;
      return false;
    }
    // if fixed and scroll down so that it should not be fixed anymore
    if (this._fixed && _botOff < 0) {
      this._fixed = false;
      return false;
    }
    // if fixed and scroll top so that it should not be fixed anymore
    if (this._fixed && _refOfTop > 0) {
      this._fixed = false;
      return false;
    }
    this._fixed = true;
    return true;
  }
}
