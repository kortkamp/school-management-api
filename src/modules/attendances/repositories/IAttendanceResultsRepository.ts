import { IFilterQuery } from 'typeorm-dynamic-filters';

import { ICreateAttendanceResultDTO } from '../dtos/ICreateAttendanceResultDTO';
import { IAttendanceResult } from '../models/IAttendanceResult';

interface IAttendanceResultsRepository {
  create(data: ICreateAttendanceResultDTO): Promise<IAttendanceResult>;
  createMany(data: ICreateAttendanceResultDTO[]): Promise<IAttendanceResult[]>;
  getAll(query: IFilterQuery): Promise<[IAttendanceResult[], number]>;
  findByIds(
    attendance_id: string,
    student_id: string,
    relations?: string[],
  ): Promise<IAttendanceResult | undefined>;
  save(dataUpdate: IAttendanceResult): Promise<void>;
  delete(user: IAttendanceResult): Promise<void>;
  getTotal(): Promise<number>;
}

export { IAttendanceResultsRepository };
