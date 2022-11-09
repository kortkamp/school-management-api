import { inject, injectable } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IExamsRepository } from '../repositories/IExamsRepository';

interface IRequest {
  query: IFilterQuery;
}
@injectable()
class ListExamsService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}
  public async execute({ query }: IRequest): Promise<IListResultInterface> {
    const { page, per_page } = query;

    const [exams, length] = await this.examsRepository.getAll(query);

    return {
      result: exams,
      total_filtered: length,
      page,
      per_page,
      total_pages: Math.ceil(length / per_page),
    };
  }
}

export { ListExamsService };
