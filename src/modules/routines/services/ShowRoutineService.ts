import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IRoutinesRepository } from '../repositories/IRoutinesRepository';

@injectable()
class ShowRoutineService {
  constructor(
    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,
  ) {}
  public async execute(routineId: string) {
    const routine = await this.routinesRepository.findById(routineId);
    if (!routine) {
      throw new ErrorsApp('Routine does not exists', 404);
    }

    return routine;
  }
}

export { ShowRoutineService };
