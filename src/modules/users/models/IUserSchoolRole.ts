import { IRole } from '@modules/roles/models/IRole';
import { ISchool } from '@modules/schools/models/ISchool';

import { IUser } from './IUser';

interface IUserSchoolRole {
  user_id: string;

  school_id: string;

  role_id: string;

  user?: IUser;

  school?: ISchool;

  role?: IRole;

  created_at: Date;
}

export { IUserSchoolRole };
