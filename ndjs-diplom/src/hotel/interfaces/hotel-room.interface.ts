import {
  FillHotelRoomDto,
  FillHotelRoomDataDto,
  SearchRoomsParamsDto,
} from '../dto/hotel-room.dto';
import { HotelRoomDocument } from '../schemas/hotel-room.schema';
import { ID } from '../../common/types';

export interface IHotelRoomService {
  create(data: FillHotelRoomDto): Promise<HotelRoomDocument>;
  findById(id: ID): Promise<HotelRoomDocument>;
  search(params: SearchRoomsParamsDto): Promise<HotelRoomDocument[]>;
  update(id: ID, data: FillHotelRoomDataDto): Promise<HotelRoomDocument>;
}
