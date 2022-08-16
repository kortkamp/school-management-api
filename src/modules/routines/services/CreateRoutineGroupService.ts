import { inject, injectable } from 'tsyringe';

import { ICreateRoutineGroupDTO } from '../dtos/ICreateRoutineGroupDTO';
import { IRoutineGroupsRepository } from '../repositories/IRoutineGroupsRepository';

@injectable()
class CreateRoutineGroupService {
  constructor(
    @inject('RoutineGroupsRepository')
    private routineGroupsRepository: IRoutineGroupsRepository,
  ) {}

  public async execute(data: ICreateRoutineGroupDTO) {
    const routineGroup = await this.routineGroupsRepository.create(data);

    return routineGroup;
  }
}

export { CreateRoutineGroupService };
