import { Component, ElementRef } from 'mojiito-core';
import { OverlayService } from './services/overlay.service';

@Component({
  selector: '.root'
})
export class NavigationOverlayComponent {


  constructor(private elementRef: ElementRef) {
    const overlay = new OverlayService();
    overlay.openOverlay();

  }
}
