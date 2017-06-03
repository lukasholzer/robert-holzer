import { IWPTaxonomy } from './wpTaxonomy.interface';

export interface ITrack {
  id: number;
  album: number;
  category: IWPTaxonomy;
  composer: IWPTaxonomy;
  onAlbum: boolean;
  albumTitle: string | boolean;
  files: Array<string>;
  title: string;
  cover: ITrackCover;
  howl?: Howl;
}

export interface ITrackCover {
  url: string;
  alt: string;
  description: string;
}
