import { Component, ElementRef, Renderer } from 'mojiito-core';

@Component({
    selector: '.overlay'
})
export class OverlayComponent {

    constructor(private elementRef: ElementRef, private renderer: Renderer) {
        // const btn: Element = renderer.selectRootElement('.toggle-drawer');
        // renderer.listen(btn, 'click', (event: Event) => {
        //     console.log('clicked');
        // });

        console.log('overlay Component init');
    }

}
