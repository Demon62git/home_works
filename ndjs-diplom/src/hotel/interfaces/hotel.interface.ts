import { FillHotelDto, SearchHotelParamsDto } from '../dto/hotel.dto';
import { HotelDocument } from '../schemas/hotel.schema';
import { ID } from '../../common/types';

export interface IHotelService {
  create(data: FillHotelDto): Promise<HotelDocument>;
  findById(id: ID): Promise<HotelDocument>;
  search(params: SearchHotelParamsDto): Promise<HotelDocument[]>;
  update(id: ID, data: FillHotelDto): Promise<HotelDocument>;
}
