import { ITeachersRepository } from '@modules/teachers/repositories/ITeachersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IListTeacherClassDTO } from '../dtos/IListTeacherClassDTO';
import { IClassGroup } from '../models/IClassGroup';
import { ITeacherClassesRepository } from '../repositories/ITeacherClassesRepository';

interface IRequest {
  schoolId: string;
  authUserId: string;
  query: IListTeacherClassDTO;
}

@injectable()
class ListTeacherClassesByTeacherService {
  constructor(
    @inject('TeacherClassesRepository')
    private teacherClassesRepository: ITeacherClassesRepository,

    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,
  ) {}
  public async execute({ query, authUserId, schoolId }: IRequest) {
    const teacher = await this.teachersRepository.findByUser(
      schoolId,
      authUserId,
    );

    if (!teacher) {
      throw new ErrorsApp('O usuário não é professor', 400);
    }

    const [teacherClasses] = await this.teacherClassesRepository.getAll({
      ...query,
      teacher_id: teacher.id,
      school_id: schoolId,
    });

    return teacherClasses;
  }
}

export { ListTeacherClassesByTeacherService };
