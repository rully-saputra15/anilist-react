export interface State {
  [key: string]: Anime[];
}

export interface Anime {
  id: number;
  title: string;
  coverImage: string;
}
