import { ICreateContactDTO } from '@modules/contacts/dtos/ICreateContactDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { IContact } from '../IContact';

class FakeContact implements IContact {
  id: string;

  name: string;

  segment_id: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateContactDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `contact-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeContact };
