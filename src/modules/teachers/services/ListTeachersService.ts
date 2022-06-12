import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';
import ErrorsApp from '@shared/errors/ErrorsApp';

@injectable()
class ListTeachersService {
  constructor(
    @inject('UsersRepository')
    private teachersRepository: IUsersRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}
  public async execute(query: IFilterQuery): Promise<IListResultInterface> {
    const { page, per_page } = query;

    const teacherRole = await this.rolesRepository.findByName('teacher');

    if (!teacherRole) {
      throw new ErrorsApp('Teacher Role does not exists', 404);
    }

    query.filterBy.push('role_id');
    query.filterType.push('eq');
    query.filterValue.push(teacherRole.id);

    const [teachers, length] = await this.teachersRepository.listTeachers(
      query,
    );

    const total = await this.teachersRepository.getTotal();

    return {
      result: teachers,
      total_registers: total,
      total_filtered: length,
      page,
      per_page,
      total_pages: Math.ceil(length / per_page),
    };
  }
}

export { ListTeachersService };
