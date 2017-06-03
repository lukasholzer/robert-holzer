export interface ITrack {
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
