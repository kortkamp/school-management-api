import { ICreateAttendanceDTO } from '@modules/attendances/dtos/ICreateAttendanceDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { IAttendance } from '../IAttendance';

class FakeAttendance implements IAttendance {
  id: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateAttendanceDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `attendance-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeAttendance };
