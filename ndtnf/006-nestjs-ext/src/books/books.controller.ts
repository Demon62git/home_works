import { Controller, Get, Body, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { IBook } from './interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAll() {
    return this.booksService.getAll();
  }

  @Post()
  create(@Body() book: IBook) {
    return this.booksService.create(book);
  }
}
