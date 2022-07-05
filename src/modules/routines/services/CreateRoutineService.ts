import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRoutineDTO } from '../dtos/ICreateRoutineDTO';
import { IRoutinesRepository } from '../repositories/IRoutinesRepository';

interface IRequest {
  auth_user: {
    school_id?: string;
  };
  data: ICreateRoutineDTO;
}
@injectable()
class CreateRoutineService {
  constructor(
    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,
  ) {}

  public async execute({ auth_user, data }: IRequest) {
    if (!auth_user.school_id) {
      throw new ErrorsApp(
        'O usuário precisa pertencer a uma escola para criar um horário',
        403,
      );
    }

    const routine = await this.routinesRepository.create({
      ...data,
      school_id: auth_user.school_id,
    });

    return routine;
  }
}

export { CreateRoutineService };
