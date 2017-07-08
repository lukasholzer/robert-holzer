import { Component, ElementRef } from 'mojiito-core';
import * as SpotifyWebApi from 'spotify-web-api-js';

@Component({
  selector: '.alben'
})
export class SpotifyComponent {

  private _element: HTMLElement;
  static ARTIST_ID = '3xU8ipC4hpcCbvPeuthdn7';

  constructor(private elementRef: ElementRef) {
    this._element = this.elementRef.nativeElement as HTMLElement;

    var spotifyApi = new SpotifyWebApi();

    spotifyApi.getArtistAlbums(SpotifyComponent.ARTIST_ID)
      .then((data) => {
        console.log('Artist information', data);
      }, (err: Error) => {
        console.error(err);
      });
  }
}
