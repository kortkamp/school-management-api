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
      throw new ErrorsApp('Usuário não encontrado', 404);
    }

    const userSubjectExists = await this.userSubjectsRepository.findByIds(data);

    if (userSubjectExists) {
      throw new ErrorsApp('Relation already exists', 409);
    }

    const userSubject = await this.userSubjectsRepository.create({
      ...data,
      type: IUserSubjectType.TEACHER,
    });

    return userSubject;
  }
}

export { CreateUserSubjectService };
