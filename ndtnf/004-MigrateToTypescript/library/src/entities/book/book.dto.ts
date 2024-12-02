import { IBook } from './book.interface'

export interface PromiseGetBookDto extends IBook {
  viewsCount: number
}

export interface UpdateBookDto {
  title: IBook['title']
  description: IBook['description']
  authors: IBook['authors']
  favorite: IBook['favorite']
  fileCover: IBook['fileCover']
}
