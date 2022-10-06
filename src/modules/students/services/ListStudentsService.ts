import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';
import ErrorsApp from '@shared/errors/ErrorsApp';

@injectable()
class ListStudentsService {
  constructor(
    @inject('UsersRepository')
    private studentsRepository: IUsersRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}
  public async execute(
    school_id: string,
    query: IFilterQuery,
  ): Promise<IListResultInterface> {
    const { page, per_page } = query;

    const [students, length] = await this.studentsRepository.listStudents(
      school_id,
      query,
    );

    return {
      result: students,
      total_filtered: length,
      page,
      per_page,
      total_pages: Math.ceil(length / per_page),
    };
  }
}

export { ListStudentsService };
