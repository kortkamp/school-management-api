import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTeacherClassDTO } from '../dtos/ICreateTeacherClassDTO';
import { ITeacherClassesRepository } from '../repositories/ITeacherClassesRepository';

interface IRequest extends Omit<ICreateTeacherClassDTO, 'subject_id'> {
  subject_ids: string[];
}

@injectable()
class CreateTeacherClassService {
  constructor(
    @inject('TeacherClassesRepository')
    private teacherClassesRepository: ITeacherClassesRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ teacher_id, class_group_id, subject_ids }: IRequest) {
    const user = await this.usersRepository.findById(teacher_id);

    if (!user) {
      throw new ErrorsApp('User not found', 404);
    }

    const role = await this.rolesRepository.findById(user.role_id);

    if (role?.name !== 'teacher') {
      throw new ErrorsApp(
        `Role ${role?.name} not allowed for teaching classes`,
        400,
      );
    }

    // const teacherClassExists = await this.teacherClassesRepository.findByIds(
    //   data,
    // );

    // if (teacherClassExists) {
    //   throw new ErrorsApp('TeacherClass relation already exists', 409);
    // }

    const teacherClassesData: ICreateTeacherClassDTO[] = subject_ids.map(
      subject_id => ({ subject_id, class_group_id, teacher_id }),
    );

    const teacherClasses = await this.teacherClassesRepository.createMany(
      teacherClassesData,
    );

    return teacherClasses;
  }
}

export { CreateTeacherClassService };
