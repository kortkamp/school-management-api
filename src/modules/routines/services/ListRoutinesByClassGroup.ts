import { inject, injectable } from 'tsyringe';

import { IRoutineSubjectsRepository } from '../repositories/IRoutineSubjectsRepository';

interface IRequest {
  class_group_id: string;
}
@injectable()
class ListRoutinesByClassGroup {
  constructor(
    @inject('RoutineSubjectsRepository')
    private routineSubjectsRepository: IRoutineSubjectsRepository,
  ) {}
  public async execute({ class_group_id }: IRequest) {
    const routineSubjects =
      await this.routineSubjectsRepository.getAllByClassGroup(class_group_id);

    return routineSubjects;
  }
}

export { ListRoutinesByClassGroup };
