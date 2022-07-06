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
    const routineSubject = await this.routineSubjectsRepository.create(data);

    return routineSubject;
  }
}

export { CreateRoutineSubjectService };
