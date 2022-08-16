import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IRoutineGroupsRepository } from '../repositories/IRoutineGroupsRepository';

@injectable()
class ShowRoutineGroupService {
  constructor(
    @inject('RoutineGroupsRepository')
    private routineGroupsRepository: IRoutineGroupsRepository,
  ) {}
  public async execute(routineGroupId: string) {
    const routineGroup = await this.routineGroupsRepository.findById(routineGroupId);
    if (!routineGroup) {
      throw new ErrorsApp('RoutineGroup does not exists', 404);
    }

    return routineGroup;
  }
}

export { ShowRoutineGroupService };
