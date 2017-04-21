import { Component, ElementRef } from 'mojiito-core';

@Component({
  selector: '.repertoire'
})
export class RepertoireComponent {

  static WORK_SELECTOR: string = 'repertoire__work';
  static ACTIVE_CLASS: string = RepertoireComponent.WORK_SELECTOR + '--active';

  constructor(private elementRef: ElementRef) {

    const workItems = document.querySelectorAll(`.${RepertoireComponent.WORK_SELECTOR}`);

    for (let i = 0, max = workItems.length; i < max; i++) {
      workItems[i].addEventListener('click', (event: Event) => {
        event.preventDefault();
        console.log(event)
      })
    }
  }

}
