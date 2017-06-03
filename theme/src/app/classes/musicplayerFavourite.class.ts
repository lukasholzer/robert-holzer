import { MusicplayerControlls } from './musicplayerControlls.class';


export class MusicplayerFavourite {

  static NAME: string = 'favourite-songs-robertholzer';
  static DEL: string = ';';

  construct() {

  }

  public isFavourite(id: number): boolean {
    return this.getFavourites().includes(id);
  }

  public removeFavourite(ids: Array<number>): void {
    let songs = this.getFavourites();
    songs = songs.filter(item => !ids.includes(item));

    this.setFavourites(songs);
  }

  public addFavourite(id: number): void {
    const favs = this.getFavourites();
    favs.push(id);

    this.setFavourites(favs);
  }

  public getFavourites(): number[] {
    const storage = window.localStorage.getItem(MusicplayerFavourite.NAME);
    if (storage == null) {
      return [];
    }

    let songs = storage.split(MusicplayerFavourite.DEL);
    const result: number[] = [];
    songs.forEach(song => {
      result.push(parseInt(song));
    });

    return result;
  }

  public setFavourites(songs: number[]): void {
    window.localStorage.setItem(MusicplayerFavourite.NAME, songs.join(MusicplayerFavourite.DEL));
  }
}
