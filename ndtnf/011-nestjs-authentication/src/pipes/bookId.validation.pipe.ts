import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class BookIdValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const hexVal25 = /[\d,a-f]{24}/;
    if (!hexVal25.test(value)) {
      throw new Error(`id записи не соответствует заданному формату`);
    }
    return value;
  }
}
