import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { ICreateUserSubjectDTO } from '@modules/subjects/dtos/ICreateUserSubjectDTO';
import {
  IUserSubject,
  IUserSubjectType,
} from '@modules/subjects/models/IUserSubject';
import { IUserSubjectsRepository } from '@modules/subjects/repositories/IUserSubjectsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

interface IRequest {
  teacher_id: string;
  subjects_ids: string[];
}

@injectable()
class CreateTeacherSubjects {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserSubjectsRepository')
    private userSubjectsRepository: IUserSubjectsRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute(data: IRequest): Promise<IUserSubject[]> {
    const user = await this.usersRepository.findById(data.teacher_id, [
      'subjects',
    ]);

    if (!user) {
      throw new ErrorsApp('User not found', 404);
    }

    const role = await this.rolesRepository.findById(user.role_id);

    if (role.name !== 'teacher') {
      throw new ErrorsApp(`Action not allowed for role: ${role.name}`, 400);
    }

    const teacherSubjectsData: ICreateUserSubjectDTO[] = data.subjects_ids.map(
      id => ({
        user_id: user.id,
        subject_id: id,
        type: IUserSubjectType.TEACHER,
      }),
    );

    const teacherSubjects = await this.userSubjectsRepository.createMany(
      teacherSubjectsData,
    );

    return teacherSubjects;
  }
}

export { CreateTeacherSubjects };
