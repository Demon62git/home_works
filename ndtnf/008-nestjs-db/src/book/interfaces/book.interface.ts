export interface CreateBookDto {
  title: string;
  description: string;
  authors: string;
  favorite: number;
}

export interface IParamId {
  id: string;
}

export interface UpdateBookDto {
  title: string;
  description: string;
  authors: string;
  favorite: number;
}
