import { Component, ElementRef } from 'mojiito-core';
import { OverlayComponent } from './overlay.component';
import { RepertoireComponent } from './repertoire.component';
import { MusicplayerComponent } from './musicplayer.component';
import { StickyComponent } from './sticky.component';
import { FilterComponent } from './filter.component';
import { NavigationComponent } from './navigation.component';
import { NavigationOverlayComponent } from './navigationOverlay.component';
import { AlbumComponent } from './album.component';

import { RequestService } from './services/request.service';
import { Overlay, OVERLAY_PROVIDERS } from './services/overlay.service';

@Component({
    selector: 'body',
    components: [
      OverlayComponent,
      RepertoireComponent,
      MusicplayerComponent,
      AlbumComponent,
      StickyComponent,
      FilterComponent,
      NavigationComponent,
      NavigationOverlayComponent
    ],
    providers: [
      OVERLAY_PROVIDERS,
      RequestService
    ]
})
export class AppComponent {

  constructor(private elementRef: ElementRef) {

  }
}
