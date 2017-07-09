import { Injectable, Injector, ComponentRef, ComponentFactoryResolver } from 'mojiito-core';
import { OverlayComponent } from '../overlay.component';

@Injectable()
export class Overlay {

  static CLASS_NAME = 'overlay';

  private _isOpen = false;
  private _containerRef: HTMLElement = null;
  private _previousContent: string;


  public close(event: Event) {
    this._isOpen = false;
    this._containerRef.setAttribute('aria-hidden', 'true');
    event.preventDefault();
  }

  public open(content: string | null): void {

    if (this._isOpen) {
      return;
    }

    if (this._containerRef === null || this._previousContent !== content) {
      this._containerRef = this._create(content);
    }

    this._previousContent = content;
    this._containerRef.setAttribute('aria-hidden', 'false');
    this._isOpen = true;
  }

  private _create(_content: string): HTMLElement {
    this._remove();

    const overlay = document.createElement('div');
    overlay.className = Overlay.CLASS_NAME;
    overlay.setAttribute('aria-hidden', 'true'); // set for Accessibility

    const content = document.createElement('div');
    content.className = 'overlay__content';

    if (_content !== null)  {
      content.innerHTML = _content;
    }

    overlay.appendChild(content);
    document.body.appendChild(overlay);

    // close overlay if click somewhere on it -> except the content
    overlay.addEventListener('click', (event: Event) => {
      if (event.target !== overlay) {
        return;
      }
      this.close(event);
    });

    return overlay;
  }

  private _changeContent(_content: string) {
    const content = this._containerRef.querySelector(`.${Overlay.CLASS_NAME}__content`) as HTMLElement;
    if (content === undefined) {
      this._remove();
      this._create(_content);
    }
    content.innerHTML = '';
    content.innerHTML = _content;
  }

  private _remove(): void {
    if (this._containerRef) {
      this._containerRef.parentNode.removeChild(this._containerRef);
    }

    this._isOpen = false;
    this._containerRef = null;
  }
}

export const OVERLAY_PROVIDERS = [Overlay];
