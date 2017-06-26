import { Component, ElementRef } from 'mojiito-core';
import { HeaderComponent } from './overlay.component';
import { RepertoireComponent } from './repertoire.component';
import { MusicplayerComponent } from './musicplayer.component';
import { StickyComponent } from './sticky.component';
import { FilterComponent } from './filter.component';
import { NavigationComponent } from './navigation.component';

@Component({
    selector: 'body',
    components: [
      HeaderComponent,
      RepertoireComponent,
      MusicplayerComponent,
      StickyComponent,
      FilterComponent,
      NavigationComponent
    ]
})
export class AppComponent {

  constructor(private elementRef: ElementRef) {

  }
}
