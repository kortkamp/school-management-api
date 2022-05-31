import { inject, injectable } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';

import { IExamResultsRepository } from '../repositories/IExamResultsRepository';

@injectable()
class ListExamResultsService {
  constructor(
    @inject('ExamResultsRepository')
    private examResultsRepository: IExamResultsRepository,
  ) {}
  public async execute(query: IFilterQuery): Promise<IListResultInterface> {
    const { page, per_page } = query;
    const [examResults, length] = await this.examResultsRepository.getAll(
      query,
    );

    const total = await this.examResultsRepository.getTotal();

    return {
      result: examResults,
      total_registers: total,
      total_filtered: length,
      page,
      per_page,
      total_pages: Math.ceil(length / per_page),
    };
  }
}

export { ListExamResultsService };
