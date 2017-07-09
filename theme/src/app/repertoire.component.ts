import { Component, ElementRef } from 'mojiito-core';

@Component({
  selector: '.repertoire'
})
export class RepertoireComponent {

  static WORK_SELECTOR = 'repertoire__work';
  static ACTIVE_CLASS: string = RepertoireComponent.WORK_SELECTOR + '--active';

  constructor(private elementRef: ElementRef) {

    const workItems = this.elementRef.nativeElement.querySelectorAll(`.${RepertoireComponent.WORK_SELECTOR}`);

    if (workItems) {
      for (let i = 0, max = workItems.length; i < max; i++) {
        workItems[i].addEventListener('click', (event: Event) => {
          event.preventDefault();

          workItems[i].classList.toggle(RepertoireComponent.ACTIVE_CLASS);
        });
      }
    }
  }

}
