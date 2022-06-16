import { inject, injectable } from 'tsyringe';

import { IUserSubjectsRepository } from '../repositories/IUserSubjectsRepository';

@injectable()
class ListUserSubjectsService {
  constructor(
    @inject('UserSubjectsRepository')
    private userSubjectsRepository: IUserSubjectsRepository,
  ) {}
  public async execute(user_id: string) {
    const userSubjects = await this.userSubjectsRepository.getAll(user_id);

    return userSubjects;
  }
}

export { ListUserSubjectsService };
