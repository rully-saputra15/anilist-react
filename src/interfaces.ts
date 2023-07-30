export interface State {
  [key: string]: Collection[];
}

export interface Collection {
  id: number;
  title: string;
  coverImage: string;
}
