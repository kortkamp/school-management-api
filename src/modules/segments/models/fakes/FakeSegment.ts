import { ICreateSegmentDTO } from '@modules/segments/dtos/ICreateSegmentDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { ISegment } from '../ISegment';

class FakeSegment implements ISegment {
  id: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateSegmentDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `segment-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeSegment };
