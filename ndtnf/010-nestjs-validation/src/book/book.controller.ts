import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { BookDocument } from './schemas/book.schema';
import { BookService } from './book.service';
import {
  ICreateBookDto,
  IParamId,
  IUpdateBookDto,
} from './interfaces/book.interface';
import { BookBodyValidationPipe } from 'src/pipes/bookBody.validation.pipe';
import { BookIdValidationPipe } from 'src/pipes/bookId.validation.pipe';
import { BookValidationPipe } from 'src/pipes/book.validation.pipe';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UsePipes(new BookValidationPipe())
  @Post()
  public create(@Body() body: ICreateBookDto): Promise<BookDocument> {
    return this.bookService.create(body);
  }

  @Get()
  public getAll(): Promise<BookDocument[]> {
    return this.bookService.getAll();
  }

  @UsePipes(new BookBodyValidationPipe())
  @Put(':id')
  public update(
    @Param('id', BookIdValidationPipe) id: IParamId,
    @Body() body: IUpdateBookDto,
  ): Promise<BookDocument> {
    return this.bookService.update(id, body);
  }

  @Delete()
  public delete(
    @Param('id', BookIdValidationPipe) id: IParamId,
  ): Promise<BookDocument> {
    return this.bookService.delete(id);
  }
}
