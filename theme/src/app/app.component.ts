import { Component, ElementRef } from 'mojiito-core';
import { HeaderComponent } from './overlay.component';
import { RepertoireComponent } from './repertoire.component';

@Component({
    selector: 'body',
    components: [HeaderComponent, RepertoireComponent]
})
export class AppComponent {

  constructor(private elementRef: ElementRef) {

  }
}
