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
  private _duration: HTMLElement;

  private _playList: Track[];
  private _isPlaying: boolean = false;
  private _currentSong: number = 0; // ID of the Current Song in the _playList Array

  constructor(private elementRef: ElementRef) {
    const _el = elementRef.nativeElement;

    this._controls = _el.querySelector(`.${MusicplayerComponent.CONTROLS_CLASS}`) as HTMLElement;
    this._play = this._controls.querySelector(`.${MusicplayerComponent.CONTROLS_CLASS}__${MusicplayerComponent.PLAY_CLASS}`) as HTMLElement;
    this._paus = this._controls.querySelector(`.${MusicplayerComponent.CONTROLS_CLASS}__${MusicplayerComponent.PAUS_CLASS}`) as HTMLElement;
    this._next = this._controls.querySelector(`.${MusicplayerComponent.CONTROLS_CLASS}__${MusicplayerComponent.NEXT_CLASS}`) as HTMLElement;
    this._prev = this._controls.querySelector(`.${MusicplayerComponent.CONTROLS_CLASS}__${MusicplayerComponent.PREV_CLASS}`) as HTMLElement;
    this._duration = this._controls.querySelector(`.timeline__end`) as HTMLElement;

    let songs = [47];

    this.createPlayList(songs).then((playList: Track[]) => {
      this._playList = playList;
      this.initEventListeners();
    });
  }

  public initEventListeners(): void {
    this._play.addEventListener('click', (event: Event) => {
      event.preventDefault();
      this.play();
    });
    this._paus.addEventListener('click', (event: Event) => {
      event.preventDefault();
      this.pause();
    });
  }

  public createPlayList(songs: Array<number>): Promise<Array<Track>> {
    const playList: Array<Track> = [];

    return new Promise((resolve: (result: any) => void, reject: (reason: Error) => void) => {

      for (let i = 0, count = songs.length; i < count; i++) {
        this.getSong(songs[i]).then((track: Track) => {
          playList.push(track);
        }).catch((error: Error) => {
          reject(error);
        });
      }

      resolve(playList);
    });
  }

  public getSong(id: number): Promise<Track> {
    const url = `${window.location.href}${MusicplayerComponent.API_URL}${id}`;
    let x = new RequestService();

    return new Promise((resolve: (result: Track) => void, reject: (reason: Error) => void) => {
      x.fetchJSON(url).then((data: IRequestResponse) => {
        resolve(data.response as Track);
      }).catch((error: Error) => {
        reject(error);
      });
    });
  }

  public play(index?: number) {
    if (this._isPlaying) {
      return;
    }

    const songId: number = typeof index === 'number' ? index : this._currentSong;
    const track: Track = this._playList[songId];
    let song: Howl;

    if (track.howl) {
      song = track.howl;
    } else {
      song = track.howl = new Howl({
        src: track.files,
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onplay: () => {
          // Display the duration.
          this._duration.innerHTML = this.formatTime(Math.round(song.duration()));

          // Start upating the progress of the track.
          // requestAnimationFrame(self.step.bind(self));
        },
        onload: () => { },
        onend: () => { },
        onpause: () => { },
        onstop: () => { }
      });
    }

    song.play();
    this._isPlaying = true;
    this._currentSong = songId;

  }

  public pause() {

    const track = this._playList[this._currentSong].howl;

    // Puase the sound.
    track.pause();
    this._isPlaying = false;
    // this.Controlls.showPlay();
  }


  private formatTime(secs: number): string {
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = (secs - minutes * 60) || 0;

    return `${minutes}:${(seconds < 10 ? '0' : '')}`;
  }

}



interface Track {
  id: number;
  album: number;
  category: number | boolean;
  composer: string | boolean;
  onAlbum: boolean;
  files: Array<string>;
  title: string;
  cover: string;
  howl: Howl;
}
