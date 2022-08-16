import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IRoutineGroupsRepository } from '../repositories/IRoutineGroupsRepository';

@injectable()
class DeleteRoutineGroupService {
  constructor(
    @inject('RoutineGroupsRepository')
    private routineGroupsRepository: IRoutineGroupsRepository,
  ) {}
  public async execute(routineGroupId: string) {
    const routineGroup = await this.routineGroupsRepository.findById(
      routineGroupId,
    );
    if (!routineGroup) {
      throw new ErrorsApp('O período não existe', 404);
    }

    await this.routineGroupsRepository.delete(routineGroup);
  }
}

export { DeleteRoutineGroupService };
