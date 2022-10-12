import { ICreateTenantDTO } from '@modules/tenants/dtos/ICreateTenantDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { ITenant } from '../ITenant';

class FakeTenant implements ITenant {
  id: string;

  name: string;

  segment_id: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateTenantDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `tenant-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeTenant };
