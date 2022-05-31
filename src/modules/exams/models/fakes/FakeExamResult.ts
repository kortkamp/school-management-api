import { ICreateExamResultDTO } from '@modules/examResults/dtos/ICreateExamResultDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { IExamResult } from '../IExamResult';

class FakeExamResult implements IExamResult {
  id: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateExamResultDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `examResult-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeExamResult };
