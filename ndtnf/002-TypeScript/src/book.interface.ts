// интерфейс книги
interface IBook {
  id: number
  title: string
  authors: string
  description: string
  favorite: number
  fileCover: string
  fileBook: string
  createBook(book: IBook): Promise<IBook>
  getBook(id: number): Promise<IBook>
  getBooks(): Promise<IBook[]>
  updateBook(id: number, book: IBook): Promise<IBook>
  deleteBook(id: number): Promise<IBook>
}

export { IBook }
