import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ICreateBookDto } from 'src/book/interfaces/book.interface';

@Injectable()
export class BookBodyValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const data: ICreateBookDto = value as ICreateBookDto;
    this.checkValLength(data.description, 'description');
    this.checkValLength(data.authors, 'authors');

    return value;
  }

  private checkValLength(val: string, fieldname: string) {
    if (val && val.length < 2) {
      throw new Error(
        `Текст атрибута ${fieldname} должен быть длинее 1 символа`,
      );
    }
  }
}
