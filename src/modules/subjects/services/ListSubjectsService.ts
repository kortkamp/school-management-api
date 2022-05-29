import { inject, injectable } from 'tsyringe';

import { ISubjectsRepository } from '../repositories/ISubjectsRepository';

@injectable()
class ListSubjectsService {
  constructor(
    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,
  ) {}
  public async execute() {
    const subjects = await this.subjectsRepository.getAll();

    return subjects;
  }
}

export { ListSubjectsService };
