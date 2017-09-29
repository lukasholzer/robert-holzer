import { Component, ElementRef } from 'mojiito-core';

@Component({
  selector: '.repertoire'
})
export class RepertoireComponent {

  private static NAV_CONTAINER = 'nav.swiper-container';
  private static WORK_CONTAINER = 'main.swiper-container';

  private navMobile = document.querySelector('.mobile-navigation') as HTMLSelectElement;
  private navigation: Swiper;
  private works: Swiper;

  constructor(private elementRef: ElementRef) {

    this.initSwipers();
    this.navMobile.addEventListener('change', (event: Event) => {
      this.navigation.slideTo(parseInt(this.navMobile.value));
    });
  }

  initSwipers() {

    this.works = new Swiper(RepertoireComponent.WORK_CONTAINER, {
      mousewheelControl: true,
      mousewheelForceToAxis: true,
      mousewheelInvert: true,
      autoHeight: true,
      slidesPerView: 'auto',
    });

    this.navigation = new Swiper(RepertoireComponent.NAV_CONTAINER, {
      spaceBetween: 10,
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      mousewheelControl: true,
      keyboardControl: true,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      onSlideChangeStart: () => {
        this.navMobile.selectedIndex = this.navigation.activeIndex;
      }
    });

    this.works.params.control = this.navigation;
    this.navigation.params.control = this.works;

  }

}
