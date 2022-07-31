import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';
import ErrorsApp from '@shared/errors/ErrorsApp';

interface IRequest {
  query: IFilterQuery;
  school_id: string;
}

@injectable()
class ListTeachersService {
  constructor(
    @inject('UsersRepository')
    private teachersRepository: IUsersRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}
  public async execute({
    school_id,
    query,
  }: IRequest): Promise<IListResultInterface> {
    const { page, per_page } = query;

    const [teachers, length] =
      await this.teachersRepository.listTeachersBySchool(school_id, query);

    return {
      result: teachers,
      total_filtered: length,
      page,
      per_page,
      total_pages: Math.ceil(length / per_page),
    };
  }
}

export { ListTeachersService };
