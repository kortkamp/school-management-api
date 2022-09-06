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
  employee_id: string;
  subjects_ids: string[];
}

@injectable()
class CreateEmployeeSubjects {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserSubjectsRepository')
    private userSubjectsRepository: IUserSubjectsRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({
    employee_id,
    subjects_ids,
  }: IRequest): Promise<IUserSubject[]> {
    const user = await this.usersRepository.findById(employee_id, ['subjects']);

    if (!user) {
      throw new ErrorsApp('User not found', 404);
    }

    const role = await this.rolesRepository.findById(user.role_id);

    if (role.name !== 'employee') {
      throw new ErrorsApp(`Action not allowed for role: ${role.name}`, 400);
    }

    const employeeSubjectsData: ICreateUserSubjectDTO[] = subjects_ids.map(
      id => ({
        user_id: user.id,
        subject_id: id,
        type: IUserSubjectType.TEACHER,
      }),
    );

    const employeeSubjects = await this.userSubjectsRepository.createMany(
      employeeSubjectsData,
    );

    return employeeSubjects;
  }
}

export { CreateEmployeeSubjects };
