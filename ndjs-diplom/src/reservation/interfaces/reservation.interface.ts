import { ReservationDocument } from '../../reservation/schemas/reservation.schema';
import {
  CreateReservationDto,
  ReservationSearchOptionsDto,
} from '../dto/reservation.dto';
import { ID } from '../../common/types';

/** Интерфейс сервиса обращений в поддержку для клиента */
export interface IReservationService {
  addReservation(data: CreateReservationDto): Promise<ReservationDocument>;
  removeReservation(id: ID): Promise<void>;
  getReservations(
    filter: ReservationSearchOptionsDto,
  ): Promise<ReservationDocument[]>;
}
