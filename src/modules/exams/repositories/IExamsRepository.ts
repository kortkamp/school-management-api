import { IFilterQuery } from 'typeorm-dynamic-filters';

import { ICreateExamDTO } from '../dtos/ICreateExamDTO';
import { IListExamsDTO } from '../dtos/IListExamsDTO';
import { IExam } from '../models/IExam';

interface IExamsRepository {
  create(data: ICreateExamDTO): Promise<IExam>;
  getAll(query: IListExamsDTO): Promise<[IExam[], number]>;
  getAllByClassSubject(
    subject_id: string,
    class_group_id: string,
    student_id?: string,
  ): Promise<IExam[]>;
  findById(userId: string, relations?: string[]): Promise<IExam | undefined>;
  show(id: string, student_id?: string): Promise<IExam | undefined>;
  save(dataUpdate: IExam): Promise<void>;
  delete(user: IExam): Promise<void>;
  getTotal(): Promise<number>;
}

export { IExamsRepository };
