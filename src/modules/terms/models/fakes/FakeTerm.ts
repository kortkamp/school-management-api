import { ICreateTermDTO } from '@modules/terms/dtos/ICreateTermDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { ITerm } from '../ITerm';

class FakeTerm implements ITerm {
  id: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateTermDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `term-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeTerm };
