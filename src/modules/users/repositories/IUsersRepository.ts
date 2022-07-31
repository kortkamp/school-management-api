import { IFilterQuery } from 'typeorm-dynamic-filters';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUser } from '../models/IUser';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  getAll(query: IFilterQuery): Promise<[IUser[], number]>;
  listStudents(query: IFilterQuery): Promise<[IUser[], number]>;
  listTeachersBySchool(
    school_id: string,
    query: IFilterQuery,
  ): Promise<[IUser[], number]>;
  listStudentsResults(
    subject_id: string,
    class_group_id: string,
    student_id?: string,
  ): Promise<IUser[]>;
  findById(userId: string, relations?: string[]): Promise<IUser | undefined>;
  findByEmail(email: string, relations?: string[]): Promise<IUser | undefined>;
  findByEmailWithRoles(email: string): Promise<IUser | undefined>;
  findByEnrollId(enroll_id: string): Promise<IUser | undefined>;
  findByCPF(CPF: string): Promise<IUser | undefined>;
  save(dataUpdate: IUser): Promise<void>;
  delete(user: IUser): Promise<void>;
  getTotal(): Promise<number>;
}

export { IUsersRepository };
