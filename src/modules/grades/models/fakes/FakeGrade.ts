import { ICreateGradeDTO } from '@modules/grades/dtos/ICreateGradeDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { IGrade } from '../IGrade';

class FakeGrade implements IGrade {
  id: string;

  name: string;

  segment_id: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateGradeDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `grade-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeGrade };
