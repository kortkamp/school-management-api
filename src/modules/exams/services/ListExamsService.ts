import { inject, injectable } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';

import { IExamsRepository } from '../repositories/IExamsRepository';

@injectable()
class ListExamsService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}
  public async execute(query: IFilterQuery): Promise<IListResultInterface> {
    const { page, per_page } = query;
    const [exams, length] = await this.examsRepository.getAll(query);

    const total = await this.examsRepository.getTotal();

    return {
      result: exams,
      total_registers: total,
      total_filtered: length,
      page,
      per_page,
      total_pages: Math.ceil(length / per_page),
    };
  }
}

export { ListExamsService };
