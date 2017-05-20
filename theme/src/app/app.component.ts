import { Component, ElementRef } from 'mojiito-core';
import { HeaderComponent } from './overlay.component';
import { RepertoireComponent } from './repertoire.component';
import { MusicplayerComponent } from './musicplayer.component';

@Component({
    selector: 'body',
    components: [
      HeaderComponent,
      RepertoireComponent,
      MusicplayerComponent
    ]
})
export class AppComponent {

  constructor(private elementRef: ElementRef) {

  }
}
