import Book from './book.js';
import { v4 as uuid } from 'uuid';

class Store {
  constructor() {
    this.books = [];

    this.books.push(
        new Book(
            {
            id: uuid(),
            title: 'Преступление и наказание',
            description: 'роман',
            authors: 'Фёдор Достоевский',
            favorite: '2',
            fileCover: 'cover1.jpg',
            fileName: 'Crime and punishment.pdf'
            }
        )
    );

    this.books.push(
        new Book(
            {
            id: uuid(),
            title: 'Унесённые ветром',
            description: 'роман-эпопея',
            authors: 'Маргарет Митчелл',
            favorite: '4',
            fileCover: 'cover2.jpg',
            fileName: 'Gone with the Wind.pdf'
            }
        )
    );

    this.books.push(
        new Book(
            {
            id: uuid(),
            title: 'Собор Парижской Богоматери',
            description: 'роман-эпопея',
            authors: 'Виктор Гюго',
            favorite: '5',
            fileCover: 'cover3.jpg',
            fileName: 'Notre-Dame de Paris.pdf'
            }
        )
    );

    this.books.push(
        new Book(
            {
            id: uuid(),
            title: 'Властелин колец',
            description: 'фэнтази',
            authors: 'Дж . Р. Р. Толкин',
            favorite: '5',
            fileCover: 'cover5.jpg',
            fileName: 'The Lord of the Rings.pdf'
            }
        )
    );

    this.books.push(
        new Book(
            {
            id: uuid(),
            title: 'Одиссея капитана Блада',
            description: 'приключенческий роман',
            authors: 'Рафаэль Сабатини',
            favorite: '5',
            fileCover: 'cover6.jpg',
            fileName: 'Captain Blood His Odyssey.pdf'
            }
        )
    );
  }

  login() {
    return json.parse(
    res.status(201),
    res.json({ id: 1, mail: "test@mail.ru" }),
    );
  }

  getAllBooks() {
    return this.books;
  }

  getBookById(id) {
    return this.books.find(el => el.id == id);
  }

  addBook(data) {
    const book = new Book({
        ...data,
        id: uuid(),
    });
    if (book) {
      this.books.push(book);
      return book;
    }
  }

  updateBook(id, data) {
    const index = this.books.findIndex(el => el.id == id);
    if (index !== -1) {
      this.books[index] = {
        ...this.books[index],
        ...data
      };
      return this.books[index];
    }
  }

  deleteBook(id) {
    const index = this.books.findIndex(el => el.id == id);
    if (index !== -1) {
      this.books.splice(index, 1);
      return true;
    }
  }
}

export default new Store()