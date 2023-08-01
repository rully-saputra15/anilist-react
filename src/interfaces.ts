export interface State {
  errorMessage: string;
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

export interface SelectedAnime {
  id: number;
  title: string;
}
