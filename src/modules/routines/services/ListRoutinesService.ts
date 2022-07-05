import { inject, injectable } from 'tsyringe';

import { IRoutine } from '../models/IRoutine';
import { IRoutinesRepository } from '../repositories/IRoutinesRepository';

interface IRequest {
  auth_user: {
    school_id?: string;
  };
}

@injectable()
class ListRoutinesService {
  constructor(
    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,
  ) {}
  public async execute({ auth_user }: IRequest): Promise<IRoutine[]> {
    const routines = await this.routinesRepository.getAll(auth_user.school_id);

    return routines;
  }
}

export { ListRoutinesService };
