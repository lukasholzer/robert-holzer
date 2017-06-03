import { Component, ElementRef, Renderer, ComponentRef } from 'mojiito-core';
import { RequestService } from './services/request.service';
import { IRequestOptions, IRequestResponse } from './interfaces/request.interface';
import { ITrack } from './interfaces/track.interface';
import { MusicplayerControlls } from './classes/musicplayerControlls.class';
import { MusicplayerFavourite } from './classes/musicplayerFavourite.class';
import { Howl, Howler } from 'howler';

declare var howler: any;

@Component({
  selector: '.music-player'
})
export class MusicplayerComponent {

  static API_URL: string = 'api/v1/track/';

  private _controlls: MusicplayerControlls = new MusicplayerControlls();
  private _playList: ITrack[];
  private _isPlaying: boolean = false;
  private _currentSong: number = 0; // ID of the Current Song in the _playList Array

  private _favourites: MusicplayerFavourite = new MusicplayerFavourite();

  constructor(private elementRef: ElementRef) {

    let songs = [47, 82];

    this.createPlayList(songs).then((playList: ITrack[]) => {
      this._playList = playList;
      this.initEventListeners();
      this.init();
    });
  }


  public init() {
    const track: ITrack = this._playList[0];
    this.setData(track);
  }

  private setTooltips(direction: string) {
    const index = this.skipIndex(direction);
    const title = this._playList[index].title;

    this._controlls.setNextPrevTooltip(direction, title);
  }

  public initEventListeners(): void {
    this._controlls.getPlayEl().addEventListener('click', (event: Event) => {
      event.preventDefault();
      this.play();
    });
    this._controlls.getPlausEl().addEventListener('click', (event: Event) => {
      event.preventDefault();
      this.pause();
    });
    this._controlls.getNextEl().addEventListener('click', (event: Event) => {
      event.preventDefault();
      this.skip('next');
    });
    this._controlls.getPrevEl().addEventListener('click', (event: Event) => {
      event.preventDefault();
      this.skip('prev');
    });
    this._controlls.getHeartEl().addEventListener('click', (event: Event) => {
      event.preventDefault();
      const track: ITrack = this._playList[this._currentSong];
      this.checkHeart(track);
    });
  }

  public createPlayList(songs: Array<number>): Promise<any> {
    const playList: ITrack[] = [];
    const promises: Promise<any>[] = [];

    for (let i = 0, count = songs.length; i < count; i++) {
      promises.push(this.getSong(songs[i]));
    }

    return Promise.all(promises);
  }

  public getSong(id: number): Promise<ITrack> {
    const url = `${window.location.href}${MusicplayerComponent.API_URL}${id}`;
    let x = new RequestService();

    return new Promise((resolve: (result: ITrack) => void, reject: (reason: Error) => void) => {
      x.fetchJSON(url).then((data: IRequestResponse) => {
        resolve(data.response as ITrack);
      }).catch((error: Error) => {
        reject(error);
      });
    });
  }

  private play(index?: number) {
    if (this._isPlaying) {
      return;
    }

    const songId: number = typeof index === 'number' ? index : this._currentSong;
    const track: ITrack = this._playList[songId];
    let song: Howl;

    if (track.howl) {
      song = track.howl;
    } else {
      song = track.howl = new Howl({
        src: track.files,
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onplay: () => {
          // Display the duration.
          const time = this.formatTime(Math.round(song.duration()));
          this._controlls.updateDuration(time);

          // Start upating the progress of the track.
          requestAnimationFrame(this.step.bind(this));
        },
        onload: () => { },
        onend: () => {
          this._isPlaying = false;
          this._controlls.showPlay();
        },
        onpause: () => { },
        onstop: () => { }
      });
    }

    song.play();


    this._controlls.showPause();
    this._isPlaying = true;
    this._currentSong = songId;
    this.setData(track);

  }

  private pause() {

    const track = this._playList[this._currentSong].howl;

    track.pause();
    this._isPlaying = false;
    this._controlls.showPlay();
  }

  /**
   * The step called within requestAnimationFrame to update the playback position.
   */
  private step(): void {
    var self = this;

    const sound: Howl = this._playList[this._currentSong].howl;

    // Determine our current seek position.
    const seek: number = sound.seek() as number || 0;
    const time = this.formatTime(Math.round(seek));
    const progress = ((seek / sound.duration()) * 100) || 0;

    this._controlls.updateProgress(time);
    this._controlls.updateProgressBar(progress);

    // If the sound is still playing, continue stepping.
    if (sound.playing()) {
      requestAnimationFrame(self.step.bind(self));
    }
  }

  /**
   * Skip to a specific track based on its playlist index.
   */
  private skipTo(index: number): void {
    const track: ITrack = this._playList[this._currentSong];
    const song: Howl = track.howl;

    if (song) {
      song.stop();
    }

    this._controlls.updateProgressBar(0);
    this.play(index);
  }

  /**
   * @param direction: string {'prev', 'next'}
   */
  private skip(direction: string) {
    let index = this.skipIndex(direction);
    this._isPlaying = false;

    this.skipTo(index);
  }

  /**
   * @param direction: string {'prev', 'next'}
   */
  private skipIndex(direction: string): number {
    let index = 0;

    if (direction === 'prev') {
      index = this._currentSong - 1;
      if (index < 0) {
        return this._playList.length - 1;
      }
    } else {
      index = this._currentSong + 1;
      if (index >= this._playList.length) {
        return 0;
      }
    }

    return index;
  }

  private checkHeart(track: ITrack): void {
    if (this._favourites.isFavourite(track.id)) {
      this._favourites.removeFavourite([track.id]);
      this._controlls.removeHeart();
    } else {
      this._favourites.addFavourite(track.id);
      this._controlls.setHeart();
    }
  }

  private setData(track: ITrack): void {

    this._controlls.changeCover(track.cover);
    this._controlls.setTitle(track.title);
    this._controlls.setMeta(track.albumTitle, track.composer);

    this.setTooltips('next');
    this.setTooltips('prev');

    if (this._favourites.isFavourite(track.id)) {
      this._controlls.setHeart();
    } else {
      this._controlls.removeHeart();
    }
  }

  private formatTime(secs: number): string {
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = (secs - minutes * 60) || 0;

    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
  }

}
