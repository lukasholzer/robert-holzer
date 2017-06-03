import { ITrackCover } from '../interfaces/track.interface';
import { IWPTaxonomy } from '../interfaces/wpTaxonomy.interface';

export class MusicplayerControlls {

  private _controls: HTMLElement;
  private _cover: HTMLImageElement;
  private _title: HTMLElement;
  private _meta: HTMLElement;

  private _play: HTMLElement;
  private _paus: HTMLElement;
  private _next: HTMLElement;
  private _prev: HTMLElement;
  private _duration: HTMLElement;
  private _progress: HTMLElement;
  private _progressBar: HTMLElement;

  constructor() {

    this._cover = document.querySelector(`.music-player__cover`) as HTMLImageElement;
    this._title = document.querySelector(`.music-player__title`) as HTMLImageElement;
    this._meta = document.querySelector(`.music-player__meta`) as HTMLImageElement;
    const _el = document.querySelector(`.music-player-controlls`) as HTMLElement;

    this._controls = _el;
    this._play = _el.querySelector(`.${_el.className}__play`) as HTMLElement;
    this._paus = _el.querySelector(`.${_el.className}__paus`) as HTMLElement;
    this._next = _el.querySelector(`.${_el.className}__next`) as HTMLElement;
    this._prev = _el.querySelector(`.${_el.className}__prev`) as HTMLElement;
    this._duration = _el.querySelector(`.timeline__end`) as HTMLElement;
    this._progress = _el.querySelector(`.timeline__start`) as HTMLElement;
    this._progressBar = _el.querySelector(`.timeline__bar`) as HTMLElement;
  }

  public getPlayEl(): HTMLElement {
    return this._play;
  }

  public getPlausEl(): HTMLElement {
    return this._paus;
  }

  public getPrevEl(): HTMLElement {
    return this._prev;
  }

  public getNextEl(): HTMLElement {
    return this._next;
  }

  public setTitle(title: string): void {
    this._title.innerHTML = title;
  }

  public setMeta(album: string | boolean, composer: IWPTaxonomy) {
    if (!album) {
      this._meta.innerHTML = composer.name;
      return;
    }
    this._meta.innerHTML = `${album} <strong>${composer.name}</strong>`;
  }


  public setNextPrevTooltip(direction: string, title: string) {
    if (direction === 'prev') {
      this._prev.setAttribute('data-tooltip', title);
    } else {
      this._next.setAttribute('data-tooltip', title);
    }
  }



  public updateDuration(duration: string) {
    this._duration.innerHTML = duration;
  }

  public updateProgress(duration: string) {
    this._progress.innerHTML = duration;
  }

  public updateProgressBar(width: number) {
    this._progressBar.style.width = `${width}%`;
  }

  public changeCover(cover: ITrackCover) {
    const src = this._cover.src;

    if (!cover.url || cover.url.length < 1) {
      this._cover.src = '';
      this._cover.alt = '';
      return;
    }
    this._cover.src = cover.url;
    this._cover.alt = cover.alt;
  }

  public showPause(): void {
    this._play.style.display = 'none';
    this._paus.style.display = 'block';
  }

  public showPlay(): void {
    this._play.style.display = 'block';
    this._paus.style.display = 'none';
  }
}


