import { Component, ElementRef, Renderer, ComponentRef } from 'mojiito-core';
import { RequestService } from './services/request.service';
import { IRequestOptions, IRequestResponse } from './interfaces/request.interface';
import { ITrack } from './interfaces/track.interface';
import { MusicplayerControlls } from './classes/musicplayerControlls.class';
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

  constructor(private elementRef: ElementRef) {

    let songs = [47];

    this.createPlayList(songs).then((playList: ITrack[]) => {
      this._playList = playList;
      this.initEventListeners();
    });
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
  }

  public createPlayList(songs: Array<number>): Promise<Array<ITrack>> {
    const playList: Array<ITrack> = [];

    return new Promise((resolve: (result: any) => void, reject: (reason: Error) => void) => {

      for (let i = 0, count = songs.length; i < count; i++) {
        this.getSong(songs[i]).then((track: ITrack) => {
          playList.push(track);
        }).catch((error: Error) => {
          reject(error);
        });
      }

      resolve(playList);
    });
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

  public play(index?: number) {
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
        onend: () => { },
        onpause: () => { },
        onstop: () => { }
      });
    }

    song.play();
    this._controlls.changeCover(track.cover);
    this._controlls.showPause();
    this._isPlaying = true;
    this._currentSong = songId;

  }

  public pause() {

    const track = this._playList[this._currentSong].howl;

    // Puase the sound.
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
    const seek: number = sound.seek() as number || 0 ;
    const time = this.formatTime(Math.round(seek));
    const progress = ((seek / sound.duration()) * 100) || 0;

    this._controlls.updateProgress(time);
    this._controlls.updateProgressBar(progress);

    // If the sound is still playing, continue stepping.
    if (sound.playing()) {
      requestAnimationFrame(self.step.bind(self));
    }
  }


  private formatTime(secs: number): string {
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = (secs - minutes * 60) || 0;

    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
  }

}
