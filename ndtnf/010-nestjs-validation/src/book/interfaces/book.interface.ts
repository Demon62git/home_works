export interface ICreateBookDto {
  title: string;
  description: string;
  authors: string;
  favorite: number;
}

export interface IParamId {
  id: string;
}

export interface IUpdateBookDto {
  title: string;
  description: string;
  authors: string;
  favorite: number;
}
