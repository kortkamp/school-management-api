import { ICreatePersonDTO } from '@modules/persons/dtos/ICreatePersonDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { IPerson } from '../IPerson';

class FakePerson implements IPerson {
  id: string;

  name: string;

  segment_id: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreatePersonDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `person-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakePerson };
