import { inject, injectable } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';

import { IAttendanceResultsRepository } from '../repositories/IAttendanceResultsRepository';

@injectable()
class ListAttendanceResultsService {
  constructor(
    @inject('AttendanceResultsRepository')
    private attendanceResultsRepository: IAttendanceResultsRepository,
  ) {}
  public async execute(query: IFilterQuery): Promise<IListResultInterface> {
    const { page, per_page } = query;
    const [attendanceResults, length] = await this.attendanceResultsRepository.getAll(
      query,
    );

    const total = await this.attendanceResultsRepository.getTotal();

    return {
      result: attendanceResults,
      total_registers: total,
      total_filtered: length,
      page,
      per_page,
      total_pages: Math.ceil(length / per_page),
    };
  }
}

export { ListAttendanceResultsService };
