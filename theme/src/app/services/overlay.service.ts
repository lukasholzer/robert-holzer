import { Injectable } from 'mojiito-core';

@Injectable()
export class OverlayService {

  public openOverlay() {
    this.createOverlay();
  }

  private createOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.setAttribute('aria-hidden', 'true'); // set for Accessibility

    const content = document.createElement('div');
    content.classList.add('overlay-content');

    overlay.appendChild(content);
    document.body.appendChild(overlay);
  }

}
