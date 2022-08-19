import { inject, injectable } from 'tsyringe';

import { ICreateRoutineDTO } from '../dtos/ICreateRoutineDTO';
import { IRoutinesRepository } from '../repositories/IRoutinesRepository';

interface IRequest {
  data: ICreateRoutineDTO;
}
@injectable()
class CreateRoutineService {
  constructor(
    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,
  ) {}

  public async execute({ data }: IRequest) {
    const routine = await this.routinesRepository.create(data);

    return routine;
  }
}

export { CreateRoutineService };
