import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateUserSubjectDTO } from '../dtos/ICreateUserSubjectDTO';
import { IUserSubjectsRepository } from '../repositories/IUserSubjectsRepository';

@injectable()
class CreateUserSubjectService {
  constructor(
    @inject('UserSubjectsRepository')
    private userSubjectsRepository: IUserSubjectsRepository,
  ) {}

  public async execute(data: ICreateUserSubjectDTO) {
    const userSubjectExists = await this.userSubjectsRepository.findByIds(data);

    if (userSubjectExists) {
      throw new ErrorsApp('Relation already exists', 409);
    }

    const userSubject = await this.userSubjectsRepository.create(data);

    return userSubject;
  }
}

export { CreateUserSubjectService };
