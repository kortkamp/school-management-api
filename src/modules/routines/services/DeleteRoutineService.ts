import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IRoutinesRepository } from '../repositories/IRoutinesRepository';

@injectable()
class DeleteRoutineService {
  constructor(
    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,
  ) {}
  public async execute(routineId: string) {
    const routine = await this.routinesRepository.findById(routineId);
    if (!routine) {
      throw new ErrorsApp('O horário não existe', 404);
    }

    await this.routinesRepository.delete(routine);
  }
}

export { DeleteRoutineService };
