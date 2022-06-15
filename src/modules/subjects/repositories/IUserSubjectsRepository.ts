import { ICreateUserSubjectDTO } from '../dtos/ICreateUserSubjectDTO';
import { IUserSubject } from '../models/IUserSubject';

interface IUserSubjectsRepository {
  create(data: ICreateUserSubjectDTO): Promise<IUserSubject>;
  findByIds(data: {
    user_id: string;
    subject_id: string;
  }): Promise<IUserSubject | undefined>;
  delete(userSubject: IUserSubject): Promise<void>;
}

export { IUserSubjectsRepository };
