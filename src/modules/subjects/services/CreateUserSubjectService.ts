import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateUserSubjectDTO } from '../dtos/ICreateUserSubjectDTO';
import { IUserSubjectType } from '../models/IUserSubject';
import { IUserSubjectsRepository } from '../repositories/IUserSubjectsRepository';

@injectable()
class CreateUserSubjectService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('UserSubjectsRepository')
    private userSubjectsRepository: IUserSubjectsRepository,
  ) {}

  public async execute(data: ICreateUserSubjectDTO) {
    const user = await this.usersRepository.findById(data.user_id);

    if (!user) {
      throw new ErrorsApp('User not found', 404);
    }

    const role = await this.rolesRepository.findById(user.role_id);

    const userSubjectExists = await this.userSubjectsRepository.findByIds(data);

    if (userSubjectExists) {
      throw new ErrorsApp('Relation already exists', 409);
    }

    if (
      !Object.values(IUserSubjectType).includes(role.name as IUserSubjectType)
    ) {
      throw new ErrorsApp(
        `Role: ${role.name} not authorized to be associate to a Subject`,
        409,
      );
    }
    const userSubject = await this.userSubjectsRepository.create({
      ...data,
      type: role.name as IUserSubjectType,
    });

    return userSubject;
  }
}

export { CreateUserSubjectService };
