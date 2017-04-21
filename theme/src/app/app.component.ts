import { Component, ElementRef } from 'mojiito-core';
import { HeaderComponent } from './overlay.component';

@Component({
    selector: 'body',
    components: [HeaderComponent]
})
export class AppComponent {

  constructor(private elementRef: ElementRef) {

  }
}
