import { IsString, MinLength, IsDefined, IsNumber } from 'class-validator';
import { ICreateBookDto } from '../interfaces/book.interface';

export class CreateBookDto {
  @IsString()
  @MinLength(2)
  @IsDefined()
  public readonly title: ICreateBookDto['title'];

  @IsString()
  @MinLength(2)
  public readonly description: ICreateBookDto['description'];

  @IsString()
  @MinLength(2)
  @IsDefined()
  public readonly authors: ICreateBookDto['authors'];

  @IsNumber()
  @IsDefined()
  public readonly favorite: ICreateBookDto['favorite'];
}
