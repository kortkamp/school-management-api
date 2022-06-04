import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTeacherClassDTO } from '../dtos/ICreateTeacherClassDTO';
import { ITeacherClassesRepository } from '../repositories/ITeacherClassesRepository';

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

  public async execute(data: ICreateTeacherClassDTO) {
    const user = await this.usersRepository.findById(data.teacher_id);

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

    const teacherClassExists = await this.teacherClassesRepository.findByIds(
      data,
    );

    if (teacherClassExists) {
      throw new ErrorsApp('TeacherClass relation already exists', 409);
    }

    const teacherClass = await this.teacherClassesRepository.create(data);

    return teacherClass;
  }
}

export { CreateTeacherClassService };
