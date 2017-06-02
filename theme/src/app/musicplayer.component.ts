import { Component, ElementRef, Renderer } from 'mojiito-core';
import { RequestService } from './services/request.service';
import { IRequestOptions, IRequestResponse } from './interfaces/request.interface';
import { Howl, Howler } from 'howler';

declare var howler: any;

@Component({
  selector: '.music-player'
})
export class MusicplayerComponent {

  static CONTROLS_CLASS: string = 'music-player-controlls';
  static PLAY_CLASS: string = 'play';
  static PAUS_CLASS: string = 'paus';
  static NEXT_CLASS: string = 'next';
  static PREV_CLASS: string = 'prev';

  static API_URL: string = 'api/v1/track/';

  private _controls: HTMLElement;
  private _play: HTMLElement;
  private _paus: HTMLElement;
  private _next: HTMLElement;
  private _prev: HTMLElement;

  private _trackList: Track[];

  constructor(private elementRef: ElementRef) {
    const _el = elementRef.nativeElement;

    this._controls = _el.querySelector(`.${MusicplayerComponent.CONTROLS_CLASS}`) as HTMLElement;
    this._play = this._controls.querySelector(`.${MusicplayerComponent.CONTROLS_CLASS}__${MusicplayerComponent.PLAY_CLASS}`) as HTMLElement;
    this._paus = this._controls.querySelector(`.${MusicplayerComponent.CONTROLS_CLASS}__${MusicplayerComponent.PAUS_CLASS}`) as HTMLElement;
    this._next = this._controls.querySelector(`.${MusicplayerComponent.CONTROLS_CLASS}__${MusicplayerComponent.NEXT_CLASS}`) as HTMLElement;
    this._prev = this._controls.querySelector(`.${MusicplayerComponent.CONTROLS_CLASS}__${MusicplayerComponent.PREV_CLASS}`) as HTMLElement;

    this.getSong(47);
  }


  public getSong(id: number): void {
    const url = `${window.location.href}${MusicplayerComponent.API_URL}${id}`;
    let x = new RequestService();

    x.fetchJSON(url).then((data: IRequestResponse) => {
      console.log(data.response);
    });
  }

}



interface Track {
  _uid: string;
  albumID?: number;
  album?: string;
  track: string;
  title: string;
  cover?: string;
  composer: string;
  text?: string;
}
