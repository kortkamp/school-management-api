import { ICreateSchoolDTO } from '@modules/schools/dtos/ICreateSchoolDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { ISchool } from '../ISchool';

class FakeSchool implements ISchool {
  id: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateSchoolDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `school-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeSchool };
