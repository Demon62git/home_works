import { IBook } from './book.interface'

// абстрактный репозиторий библиотеки
abstract class BooksRepository implements IBook {
  id: number
  title: string
  authors: string
  description: string
  favorite: number
  fileCover: string
  fileBook: string
  abstract createBook(book: IBook): Promise<IBook>
  abstract getBook(id: number): Promise<IBook>
  abstract getBooks(): Promise<IBook[]>
  abstract updateBook(id: number, book: IBook): Promise<IBook>
  abstract deleteBook(id: number): Promise<IBook>
}

export default BooksRepository
