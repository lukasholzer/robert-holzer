import { Component, ElementRef } from 'mojiito-core';
import { Overlay } from './services/overlay.service';

@Component({
  selector: '.album'
})
export class AlbumComponent {

  constructor(private elementRef: ElementRef, private _overlay: Overlay) {

    const _el = this.elementRef.nativeElement as HTMLElement;

    _el.addEventListener('click', (event: Event) => {
      const content = _el.querySelector('.album__overlay').innerHTML;
      this._overlay.open(content);
    });
  }
}
