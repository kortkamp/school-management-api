import { MessageType } from '../models/IMessage';

interface ICreateMessageDTO {
  user_id: string | undefined;

  school_id: string | undefined;

  sender_id: string | undefined;

  type: MessageType;

  title: string;

  text: string;

  link: string;
}

export { ICreateMessageDTO };
