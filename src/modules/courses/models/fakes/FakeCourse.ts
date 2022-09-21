import { ICreateCourseDTO } from '@modules/courses/dtos/ICreateCourseDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { ICourse } from '../ICourse';

class FakeCourse implements ICourse {
  id: string;

  name: string;

  segment_id: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateCourseDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `course-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeCourse };
