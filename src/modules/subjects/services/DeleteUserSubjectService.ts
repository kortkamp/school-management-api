import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateUserSubjectDTO } from '../dtos/ICreateUserSubjectDTO';
import { IUserSubjectsRepository } from '../repositories/IUserSubjectsRepository';

@injectable()
class DeleteUserSubjectService {
  constructor(
    @inject('UserSubjectsRepository')
    private userSubjectsRepository: IUserSubjectsRepository,
  ) {}

  public async execute(data: Omit<ICreateUserSubjectDTO, 'type'>) {
    const userSubjectExists = await this.userSubjectsRepository.findByIds(data);

    if (!userSubjectExists) {
      throw new ErrorsApp('Relation not found', 404);
    }

    await this.userSubjectsRepository.delete(userSubjectExists);
  }
}

export { DeleteUserSubjectService };
