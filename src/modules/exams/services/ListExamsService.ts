import { inject, injectable } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IExamsRepository } from '../repositories/IExamsRepository';

interface IRequest {
  user: {
    id: string;
    role: string;
    school_id?: string;
    class_group_id?: string;
  };
  query: IFilterQuery;
}
@injectable()
class ListExamsService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}
  public async execute({
    user,
    query,
  }: IRequest): Promise<IListResultInterface> {
    const { page, per_page } = query;

    switch (user.role) {
      case 'admin':
        break;
      case 'teacher':
        query.filterBy.push('teacher_id');
        query.filterType.push('eq');
        query.filterValue.push(user.id);
        break;
      case 'student':
        if (!user.class_group_id) {
          throw new ErrorsApp('Aluno nao está em nenhuma turma', 403);
        }
        query.filterBy.push('class_id');
        query.filterType.push('eq');
        query.filterValue.push(user.class_group_id);
        break;
      default:
        throw new ErrorsApp('Não autorizado', 403);
        break;
    }
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
