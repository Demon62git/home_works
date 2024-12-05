import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BookDocument } from './schemas/book.schema';
import { BookService } from './book.service';
import {
  CreateBookDto,
  IParamId,
  UpdateBookDto,
} from './interfaces/book.interface';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  public create(@Body() body: CreateBookDto): Promise<BookDocument> {
    return this.bookService.create(body);
  }

  @Get()
  public getAll(): Promise<BookDocument[]> {
    return this.bookService.getAll();
  }

  @Put(':id')
  public update(
    @Param() { id }: IParamId,
    @Body() body: UpdateBookDto,
  ): Promise<BookDocument> {
    return this.bookService.update(id, body);
  }

  @Delete()
  public delete(@Param() { id }: IParamId): Promise<BookDocument> {
    return this.bookService.delete(id);
  }
}
