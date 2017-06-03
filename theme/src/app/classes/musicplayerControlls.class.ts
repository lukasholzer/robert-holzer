export class MusicplayerControlls {

  private _controls: HTMLElement;
  private _play: HTMLElement;
  private _paus: HTMLElement;
  private _next: HTMLElement;
  private _prev: HTMLElement;
  private _cover: HTMLImageElement;
  private _duration: HTMLElement;
  private _progress: HTMLElement;
  private _progressBar: HTMLElement;

  constructor() {

    this._cover = document.querySelector(`.music-player__cover`) as HTMLImageElement;
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

  public updateDuration(duration: string) {
    this._duration.innerHTML = duration;
  }

  public updateProgress(duration: string) {
    this._progress.innerHTML = duration;
  }

  public updateProgressBar(width: number) {
    this._progressBar.style.width = `${width}%`;
  }

  public changeCover(cover: string) {
    const src = this._cover.src;

    if (!cover || cover.length < 1 || src === cover) {
      return;
    }
    this._cover.src = cover;
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


