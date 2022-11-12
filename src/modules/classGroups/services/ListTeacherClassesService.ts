import { inject, injectable } from 'tsyringe';

import { IListTeacherClassDTO } from '../dtos/IListTeacherClassDTO';
import { ITeacherClassesRepository } from '../repositories/ITeacherClassesRepository';

interface IRequest {
  schoolId: string;
  query: IListTeacherClassDTO;
}

@injectable()
class ListTeacherClassesService {
  constructor(
    @inject('TeacherClassesRepository')
    private teacherClassesRepository: ITeacherClassesRepository,
  ) {}
  public async execute({ query, schoolId }: IRequest) {
    const [teacherClasses] = await this.teacherClassesRepository.getAll({
      ...query,
      school_id: schoolId,
    });

    return teacherClasses;
  }
}

export { ListTeacherClassesService };
