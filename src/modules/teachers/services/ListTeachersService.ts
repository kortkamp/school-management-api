import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IListTeachersDTO } from '../dtos/IListTeachersDTO';
import { ITeachersRepository } from '../repositories/ITeachersRepository';

interface IRequest {
  query: IFilterQuery;
  school_id: string;
}

@injectable()
class ListTeachersService {
  constructor(
    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,
  ) {}
  public async execute(
    authSchoolId: string,
    {
      active = true,
      school_id = authSchoolId,
      page = 1,
      per_page = 10,
    }: IListTeachersDTO,
  ): Promise<IListResultInterface> {
    const [teachers, length] = await this.teachersRepository.getAll({
      active,
      school_id,
      page,
      per_page,
    });

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
