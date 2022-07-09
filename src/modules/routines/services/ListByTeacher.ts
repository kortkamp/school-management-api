import { inject, injectable } from 'tsyringe';

import { IRoutine } from '../models/IRoutine';
import { IRoutinesRepository } from '../repositories/IRoutinesRepository';

interface IRequest {
  auth_user: {
    school_id?: string;
  };
  teacher_id: string;
}

@injectable()
class ListByTeacher {
  constructor(
    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,
  ) {}
  public async execute({ teacher_id }: IRequest): Promise<IRoutine[]> {
    const routines = await this.routinesRepository.getAllByTeacher(teacher_id);

    return routines;
  }
}

export { ListByTeacher };
