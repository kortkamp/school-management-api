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
  public async execute(query: IFilterQuery): Promise<IListResultInterface> {
    const { page, per_page } = query;

    const studentRole = await this.rolesRepository.findByName('student');

    if (!studentRole) {
      throw new ErrorsApp('Student Role does not exists', 404);
    }

    query.filterBy.push('role_id');
    query.filterType.push('eq');
    query.filterValue.push(studentRole.id);

    const [students, length] = await this.studentsRepository.listStudents(
      query,
    );

    const total = await this.studentsRepository.getTotal();

    return {
      result: students,
      total_registers: total,
      total_filtered: length,
      page,
      per_page,
      total_pages: Math.ceil(length / per_page),
    };
  }
}

export { ListStudentsService };
