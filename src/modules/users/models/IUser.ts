import { ISubject } from '@modules/subjects/models/ISubject';

interface IUser {
  id: string;

  name: string;

  role_id: string;

  school_id?: string;

  segment_id?: string;

  grade_id?: string;

  class_group_id?: string;

  subjects: ISubject[];

  email: string;

  password: string;

  active: boolean;

  avatar?: string;

  created_at: Date;

  updated_at: Date;
}

export { IUser };
