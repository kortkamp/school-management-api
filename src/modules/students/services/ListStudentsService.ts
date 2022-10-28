import { inject, injectable } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IListStudentsDTO } from '../dtos/IListStudentsDTO';
import { IStudentsRepository } from '../repositories/IStudentsRepository';

// type IRequest = Omit<IListStudentsDTO, "">;

@injectable()
class ListStudentsService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}
  public async execute(
    authSchoolId: string,
    {
      active = true,
      school_id = authSchoolId,
      course_id,
      grade_id,
      class_group_id,
      page = 1,
      per_page = 10,
    }: IListStudentsDTO,
  ): Promise<IListResultInterface> {
    const [students, length] = await this.studentsRepository.getAll({
      active,
      school_id,
      course_id,
      grade_id,
      class_group_id,
      page,
      per_page,
    });

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
