import { IFilterQuery } from 'typeorm-dynamic-filters';

import { ICreateExamDTO } from '../dtos/ICreateExamDTO';
import { IExam } from '../models/IExam';

interface IExamsRepository {
  create(data: ICreateExamDTO): Promise<IExam>;
  getAll(query: IFilterQuery): Promise<[IExam[], number]>;
  findById(userId: string, relations?: string[]): Promise<IExam | undefined>;
  save(dataUpdate: IExam): Promise<void>;
  delete(user: IExam): Promise<void>;
  getTotal(): Promise<number>;
}

export { IExamsRepository };
