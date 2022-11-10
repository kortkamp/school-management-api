import { inject, injectable } from 'tsyringe';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IListExamsDTO } from '../dtos/IListExamsDTO';
import { IExamsRepository } from '../repositories/IExamsRepository';

interface IRequest {
  authSchoolId: string;
  query: IListExamsDTO;
}
@injectable()
class ListExamsService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}
  public async execute({
    authSchoolId,
    query,
  }: IRequest): Promise<IListResultInterface> {
    const { page = 1, per_page = 10 } = query;

    const [exams, length] = await this.examsRepository.getAll({
      ...query,
      school_id: authSchoolId,
    });

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
