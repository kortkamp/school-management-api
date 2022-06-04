import { IUserSubjectType } from '../models/IUserSubject';

interface ICreateUserSubjectDTO {
  user_id: string;
  subject_id: string;
  type: IUserSubjectType;
}

export { ICreateUserSubjectDTO };
