import { Injectable } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import {
  ICreateBookDto,
  IParamId,
  IUpdateBookDto,
} from './interfaces/book.interface';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public create(data: ICreateBookDto): Promise<BookDocument> {
    const book = new this.BookModel(data);
    return book.save();
  }

  public getAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  public update(id: IParamId, data: IUpdateBookDto): Promise<BookDocument> {
    return this.BookModel.findOneAndUpdate({ _id: id }, data);
  }

  public delete(id: IParamId): Promise<BookDocument> {
    // return this.BookModel.findByIdAndDelete({ _id: id });
    return this.BookModel.findByIdAndDelete(id);
  }
}
