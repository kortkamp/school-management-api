import { inject, injectable } from 'tsyringe';

import { IRoutineGroupsRepository } from '../repositories/IRoutineGroupsRepository';

@injectable()
class ListRoutineGroupsService {
  constructor(
    @inject('RoutineGroupsRepository')
    private routineGroupsRepository: IRoutineGroupsRepository,
  ) {}
  public async execute(school_id: string) {
    const routineGroups = await this.routineGroupsRepository.getAll(school_id);

    return routineGroups;
  }
}

export { ListRoutineGroupsService };
