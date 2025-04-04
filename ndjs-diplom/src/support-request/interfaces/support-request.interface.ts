import { MessageDocument, SupportRequestDocument } from '../schemas';
import { GetChatListParams, SendMessageDto } from '../dto/support-request.dto';
import { ID } from '../../common/types';
import { UserDocument } from 'src/user/schemas/user.schema';

/** Интерфейс сервиса обращений в поддержку */
export interface ISupportRequestService {
  findSupportRequests(
    params: GetChatListParams,
  ): Promise<SupportRequestDocument[]>;
  sendMessage(
    data: SendMessageDto,
    user: UserDocument,
  ): Promise<MessageDocument>;
  getMessages(supportRequest: ID): Promise<SupportRequestDocument>;
  subscribe(
    supportRequestId: string,
    handler: (
      supportRequest: SupportRequestDocument,
      message: MessageDocument,
    ) => void,
  ): () => void;
}
