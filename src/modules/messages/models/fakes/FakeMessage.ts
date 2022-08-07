import { ICreateMessageDTO } from '@modules/messages/dtos/ICreateMessageDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { IMessage } from '../IMessage';

class FakeMessage implements IMessage {
  id: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateMessageDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `message-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeMessage };
