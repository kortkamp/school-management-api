import { inject, injectable } from 'tsyringe';

import { ICreateRoutineSubjectDTO } from '../dtos/ICreateRoutineSubjectDTO';
import { IRoutineSubjectsRepository } from '../repositories/IRoutineSubjectsRepository';

@injectable()
class CreateRoutineSubjectService {
  constructor(
    @inject('RoutineSubjectsRepository')
    private routineSubjectsRepository: IRoutineSubjectsRepository,
  ) {}

  public async execute(data: ICreateRoutineSubjectDTO[]) {
    const { class_group_id } = data[0];
    const routineSubject = await this.routineSubjectsRepository.clearAndCreate(
      class_group_id,
      data,
    );

    return routineSubject;
  }
}

export { CreateRoutineSubjectService };
