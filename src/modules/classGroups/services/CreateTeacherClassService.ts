import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { ITeachersRepository } from '@modules/teachers/repositories/ITeachersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTeacherClassDTO } from '../dtos/ICreateTeacherClassDTO';
import { ITeacherClassesRepository } from '../repositories/ITeacherClassesRepository';

interface IRequest {
  schoolId: string;
  data: ICreateTeacherClassDTO;
}

@injectable()
class CreateTeacherClassService {
  constructor(
    @inject('TeacherClassesRepository')
    private teacherClassesRepository: ITeacherClassesRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,
  ) {}

  public async execute({ schoolId, data }: IRequest) {
    const user = await this.teachersRepository.findById(
      schoolId,
      data.teacher_id,
    );

    if (!user) {
      throw new ErrorsApp('O professor não existe', 404);
    }

    // const teacherClassExists = await this.teacherClassesRepository.findByIds(
    //   data,
    // );

    // if (teacherClassExists) {
    //   throw new ErrorsApp('TeacherClass relation already exists', 409);
    // }

    const teacherClasses = await this.teacherClassesRepository.create({
      ...data,
      school_id: schoolId,
    });

    return teacherClasses;
  }
}

export { CreateTeacherClassService };
