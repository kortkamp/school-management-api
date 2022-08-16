import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRoutineGroupDTO } from '../dtos/ICreateRoutineGroupDTO';
import { IRoutineGroupsRepository } from '../repositories/IRoutineGroupsRepository';

interface IRequest {
  routineGroupId: string;
  data: Partial<ICreateRoutineGroupDTO>;
}

@injectable()
class UpdateRoutineGroupService {
  constructor(
    @inject('RoutineGroupsRepository')
    private routineGroupsRepository: IRoutineGroupsRepository,
  ) {}
  public async execute({ routineGroupId, data }: IRequest) {
    const routineGroup = await this.routineGroupsRepository.findById(
      routineGroupId,
    );

    if (!routineGroup) {
      throw new ErrorsApp('O período não existe', 404);
    }

    Object.assign(routineGroup, data);

    await this.routineGroupsRepository.save(routineGroup);

    return routineGroup;
  }
}

export { UpdateRoutineGroupService };
