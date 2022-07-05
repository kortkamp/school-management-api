import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRoutineDTO } from '../dtos/ICreateRoutineDTO';
import { IRoutinesRepository } from '../repositories/IRoutinesRepository';

interface IRequest {
  routineId: string;
  data: Partial<ICreateRoutineDTO>;
}

@injectable()
class UpdateRoutineService {
  constructor(
    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,
  ) {}
  public async execute({ routineId, data }: IRequest) {
    const routine = await this.routinesRepository.findById(routineId);

    if (!routine) {
      throw new ErrorsApp('Routine not found', 404);
    }

    Object.assign(routine, data);

    await this.routinesRepository.save(routine);

    return routine;
  }
}

export { UpdateRoutineService };
