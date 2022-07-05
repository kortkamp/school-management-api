import { ICreateRoutineDTO } from '@modules/routines/dtos/ICreateRoutineDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { IRoutine } from '../IRoutine';

class FakeRoutine implements IRoutine {
  id: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateRoutineDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `routine-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeRoutine };
