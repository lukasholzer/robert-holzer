import { Component, ElementRef } from 'mojiito-core';
import { HeaderComponent } from './overlay.component';

import '../fonts/neutra-text/neutra-text.scss';
import './app.component.scss';

@Component({
    selector: 'body',
    components: [HeaderComponent]
})
export class AppComponent {

    constructor(private elementRef: ElementRef) {
        console.log(elementRef.nativeElement);
    }
}
