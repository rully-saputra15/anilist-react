export interface State {
  errorMessage: string
  data: CollectionState;
}

export interface CollectionState {
  [key: string]: Anime[];
}

export interface Anime {
  id: number;
  title: string;
  coverImage: string;
}
