import { Component, ElementRef } from 'mojiito-core';
import { Overlay } from './services/overlay.service';
import * as Swiper from 'swiper';

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


    var swiper = new Swiper('.album-swiper', {
      slidesPerView: 6,
      spaceBetween: 20,
      nextButton : '.album-swiper__next',
      prevButton : '.album-swiper__prev',
      // loop: true,
      // Disable preloading of all images
      preloadImages : false,
      // Enable lazy loading
      lazyLoading: true,
      breakpoints: {
        1024: {
          slidesPerView: 5
        },
        768: {
          slidesPerView: 4
        },
        640: {
          slidesPerView: 3
        },
        320: {
          slidesPerView: 2
        }
      }
    });
  }
}
