import { inject, injectable } from 'tsyringe';

import { ICreateRoutineGroupDTO } from '../dtos/ICreateRoutineGroupDTO';
import { IRoutineGroupsRepository } from '../repositories/IRoutineGroupsRepository';

interface IRequest {
  school_id: string;
  data: Omit<ICreateRoutineGroupDTO, 'school_id'>;
}
@injectable()
class CreateRoutineGroupService {
  constructor(
    @inject('RoutineGroupsRepository')
    private routineGroupsRepository: IRoutineGroupsRepository,
  ) {}

  public async execute({ data, school_id }: IRequest) {
    const routineGroup = await this.routineGroupsRepository.create({
      ...data,
      school_id,
    });

    return routineGroup;
  }
}

export { CreateRoutineGroupService };
