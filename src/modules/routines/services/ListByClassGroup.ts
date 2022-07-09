import { inject, injectable } from 'tsyringe';

import { IRoutine } from '../models/IRoutine';
import { IRoutinesRepository } from '../repositories/IRoutinesRepository';

interface IRequest {
  auth_user: {
    school_id?: string;
  };
  class_group_id: string;
}

@injectable()
class ListByClassGroup {
  constructor(
    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,
  ) {}
  public async execute({ class_group_id }: IRequest): Promise<IRoutine[]> {
    const routines = await this.routinesRepository.getAllByClassGroup(
      class_group_id,
    );

    return routines;
  }
}

export { ListByClassGroup };
