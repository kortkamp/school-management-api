import { inject, injectable } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';

import { ITeacherClassesRepository } from '../repositories/ITeacherClassesRepository';

@injectable()
class ListTeacherClassesService {
  constructor(
    @inject('TeacherClassesRepository')
    private teacherClassesRepository: ITeacherClassesRepository,
  ) {}
  public async execute(query: IFilterQuery): Promise<IListResultInterface> {
    const { page, per_page } = query;
    const [teacherClasses, length] = await this.teacherClassesRepository.getAll(
      query,
    );

    return {
      result: teacherClasses,
      // total_registers: total,
      total_filtered: length,
      page,
      per_page,
      total_pages: Math.ceil(length / per_page),
    };
  }
}

export { ListTeacherClassesService };
