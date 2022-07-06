import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IRoutineSubjectsRepository } from '../repositories/IRoutineSubjectsRepository';

@injectable()
class DeleteRoutineSubjectService {
  constructor(
    @inject('RoutineSubjectsRepository')
    private routineSubjectsRepository: IRoutineSubjectsRepository,
  ) {}
  public async execute(routineSubjectId: string) {
    const routineSubject = await this.routineSubjectsRepository.findById(
      routineSubjectId,
    );
    if (!routineSubject) {
      throw new ErrorsApp('RoutineSubject does not exists', 404);
    }

    await this.routineSubjectsRepository.delete(routineSubject);
  }
}

export { DeleteRoutineSubjectService };
