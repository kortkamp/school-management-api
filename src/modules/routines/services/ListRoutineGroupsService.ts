import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IRoutineGroupsRepository } from '../repositories/IRoutineGroupsRepository';

@injectable()
class ListRoutineGroupsService {
  constructor(
    @inject('RoutineGroupsRepository')
    private routineGroupsRepository: IRoutineGroupsRepository,
  ) {}
  public async execute(school_id: string) {
    if (!school_id) {
      throw new ErrorsApp('Id da escola não informado', 400);
    }
    const routineGroups = await this.routineGroupsRepository.getAll(school_id);

    return routineGroups;
  }
}

export { ListRoutineGroupsService };
