import { IAddress } from '@modules/addresses/models/IAddress';
import { ISubject } from '@modules/subjects/models/ISubject';

import { IUserSchoolRole } from './IUserSchoolRole';

interface IUser {
  id: string;

  number_id: number;

  name: string;

  email: string;

  password: string;

  active: boolean;

  avatar?: string;

  tenant_id: string;

  created_at: Date;

  updated_at: Date;
}

export { IUser };
