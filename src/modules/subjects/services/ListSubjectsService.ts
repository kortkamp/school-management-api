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
    switch (user.role) {
      case 'admin':
        return this.subjectsRepository.getAll();
      case 'teacher':
        return this.subjectsRepository.getAllByTeacher(user.id);
      default:
        throw new ErrorsApp('Não autorizado', 403);
    }
  }
}

export { ListSubjectsService };
