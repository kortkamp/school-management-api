import { IFilterQuery } from 'typeorm-dynamic-filters';

import { ICreateExamResultDTO } from '../dtos/ICreateExamResultDTO';
import { IExamResult } from '../models/IExamResult';

interface IExamResultsRepository {
  create(data: ICreateExamResultDTO): Promise<IExamResult>;
  getAll(query: IFilterQuery): Promise<[IExamResult[], number]>;
  findById(userId: string, relations?: string[]): Promise<IExamResult | undefined>;
  save(dataUpdate: IExamResult): Promise<void>;
  delete(user: IExamResult): Promise<void>;
  getTotal(): Promise<number>;
}

export { IExamResultsRepository };
