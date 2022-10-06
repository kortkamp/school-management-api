import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISubjectsRepository } from '../repositories/ISubjectsRepository';

interface IRequest {
  user: {
    id: string;
    role: string;
    school_id?: string;
  };
}

@injectable()
class ListSubjectsService {
  constructor(
    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,
  ) {}
  public async execute({ user }: IRequest) {
    return this.subjectsRepository.getAll();
  }
}

export { ListSubjectsService };
