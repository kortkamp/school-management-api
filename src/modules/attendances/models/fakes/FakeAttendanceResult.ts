import { ICreateAttendanceResultDTO } from '@modules/attendanceResults/dtos/ICreateAttendanceResultDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { IAttendanceResult } from '../IAttendanceResult';

class FakeAttendanceResult implements IAttendanceResult {
  id: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateAttendanceResultDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `attendanceResult-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeAttendanceResult };
