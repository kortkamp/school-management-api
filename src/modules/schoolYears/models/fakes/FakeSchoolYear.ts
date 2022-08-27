import { ICreateSchoolYearDTO } from '@modules/schoolYears/dtos/ICreateSchoolYearDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { ISchoolYear } from '../ISchoolYear';

class FakeSchoolYear implements ISchoolYear {
  id: string;

  name: string;

  segment_id: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateSchoolYearDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `schoolYear-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeSchoolYear };
