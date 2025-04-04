import { UserDocument } from '../schemas/user.schema';
import { CreateUserDto, SearchUserParamsDto } from '../dto/user.dto';
import { ID } from '../../common/types';

export interface IUserService {
  create(data: CreateUserDto): Promise<UserDocument>;
  findById(id: ID): Promise<UserDocument>;
  findByEmail(email: string): Promise<UserDocument>;
  findAll(params: SearchUserParamsDto): Promise<UserDocument[]>;
}
