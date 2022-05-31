import { ICreateExamDTO } from '@modules/exams/dtos/ICreateExamDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { IExam } from '../IExam';

class FakeExam implements IExam {
  id: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateExamDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `exam-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeExam };
