import { Component, ElementRef, Renderer } from 'mojiito-core';

declare var howler: any;

@Component({
  selector: '.music-player'
})
export class MusicplayerComponent {

  static CONTROLS_CLASS: string = 'controls';
  static PLAY_CLASS: string = 'play';
  static NEXT_CLASS: string = 'next';
  static PREV_CLASS: string = 'prev';

  static API_URL: string = 'api/v1/tracks/'

  private _controls: HTMLElement;
  private _play: HTMLElement;
  private _next: HTMLElement;
  private _prev: HTMLElement;

  private _trackList: Track[];

  constructor(private elementRef: ElementRef) {
    const _el = elementRef.nativeElement;





    // this._controls = _el.querySelector(`.${MusicplayerComponent.CONTROLS_CLASS}`) as HTMLElement;
    // this._play = this._controls.querySelector(`.${MusicplayerComponent.PLAY_CLASS}`) as HTMLElement;
    // this._next = this._controls.querySelector(`.${MusicplayerComponent.NEXT_CLASS}`) as HTMLElement;
    // this._prev = this._controls.querySelector(`.${MusicplayerComponent.PREV_CLASS}`) as HTMLElement;

  }


  public getSong(): Promise<any> {
    return new Promise((resolve, reject) => {
      // let formData: any = new FormData()
      const url = `https://api.spotify.com/v1/albums/4GbsfB8iz0NALu2NzBBmZl`;
      let xhr = new XMLHttpRequest()
      // for (let file of files) {
      //   formData.append("uploads[]", file, file.name)
      // }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log(xhr.response);
          if (xhr.status === 200) {
          } else {
            console.log()
            reject(xhr.response)
          }
        }
      }
      xhr.open("GET", url, true)
      // xhr.send(formData)
    });
  }

  // public play(): void {

  // }

  // public pause(): void {

  // }

  // public next(): void {

  // }

  // public prev(): void {

  // }
}


interface Track {
  _uid: string,
  albumID?: number,
  album?: string,
  track: string,
  title: string,
  cover?: string,
  composer: string
  text?: string
}
