import { Component, ElementRef } from 'mojiito-core';
import { platformBrowser } from 'mojiito-platform-browser';
import { AppComponent } from './app/app.component';

// Init Mojiito
platformBrowser().bootstrapComponent(AppComponent);

const nav = document.querySelector('.mobile-navigation') as HTMLSelectElement;

nav.addEventListener('change', (event: Event) => {
  navigation.slideTo(parseInt(nav.value));
});

const works = new Swiper('main.swiper-container', {
  mousewheelControl: true,
  mousewheelForceToAxis: true,
  mousewheelInvert: true,
  autoHeight: true,
  slidesPerView: 'auto',
});

const navigation = new Swiper('nav.swiper-container', {
  spaceBetween: 10,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: '4',
  mousewheelControl: true,
  keyboardControl: true,
  touchRatio: 0.2,
  slideToClickedSlide: true,
  onSlideChangeStart: function() {
    nav.selectedIndex = navigation.activeIndex;
  }
});

works.params.control = navigation;
navigation.params.control = works;
