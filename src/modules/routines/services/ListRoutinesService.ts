import { inject, injectable } from 'tsyringe';

import { IRoutine } from '../models/IRoutine';
import { IRoutinesRepository } from '../repositories/IRoutinesRepository';

interface IRequest {
  schoolId: string;
}

@injectable()
class ListRoutinesService {
  constructor(
    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,
  ) {}
  public async execute({ schoolId }: IRequest): Promise<IRoutine[]> {
    const routines = await this.routinesRepository.getAll(schoolId);

    return routines;
  }
}

export { ListRoutinesService };
