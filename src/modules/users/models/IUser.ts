import { IAddress } from '@modules/addresses/models/IAddress';
import { IRole } from '@modules/roles/models/IRole';
import { ISubject } from '@modules/subjects/models/ISubject';

// TODO add an address table
// TODO add an heath table
// TODO add an OtherInfo Table like religion , gender , food preferences

interface IUser {
  id: string;

  name: string;

  //= ========

  enroll_id?: string; // unique

  CPF?: string; // unique

  phone?: string;

  sex: 'M' | 'F';

  birth: Date;

  //= =========

  role_id: string;

  school_id?: string;

  segment_id?: string;

  grade_id?: string;

  class_group_id?: string;

  subjects: ISubject[];

  role?: IRole;

  email: string;

  password: string;

  active: boolean;

  avatar?: string;

  address_id?: string;

  address?: IAddress;

  created_at: Date;

  updated_at: Date;
}

export { IUser };
