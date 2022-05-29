import { ICreateSubjectDTO } from '@modules/subjects/dtos/ICreateSubjectDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { ISubject } from '../ISubject';

class FakeSubject implements ISubject {
  id: string;

  name: string;

  segment_id: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateSubjectDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `subject-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeSubject };
