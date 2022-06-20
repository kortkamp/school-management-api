import { ICreateSubjectDTO } from '../dtos/ICreateSubjectDTO';
import { ISubject } from '../models/ISubject';

interface ISubjectsRepository {
  create(data: ICreateSubjectDTO): Promise<ISubject>;
  getAll(relations?: string[]): Promise<ISubject[]>;
  getAllByTeacher(teacher_id: string): Promise<ISubject[]>;
  findById(userId: string, relations?: string[]): Promise<ISubject | undefined>;
  findByName(name: string): Promise<ISubject | undefined>;
  save(dataUpdate: ISubject): Promise<void>;
  delete(user: ISubject): Promise<void>;
  getTotal(): Promise<number>;
}

export { ISubjectsRepository };
