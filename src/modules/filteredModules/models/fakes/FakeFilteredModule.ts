import { ICreateFilteredModuleDTO } from '@modules/filteredModules/dtos/ICreateFilteredModuleDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { IFilteredModule } from '../IFilteredModule';

class FakeFilteredModule implements IFilteredModule {
  id: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateFilteredModuleDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `filteredModule-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeFilteredModule };
