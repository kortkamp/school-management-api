import { inject, injectable } from 'tsyringe';

import { ICreateRoutineSubjectDTO } from '../dtos/ICreateRoutineSubjectDTO';
import { IRoutineSubjectsRepository } from '../repositories/IRoutineSubjectsRepository';

interface IRequest {
  schoolId: string;
  routineSubjects: Omit<ICreateRoutineSubjectDTO, 'school_id'>[];
}

@injectable()
class CreateRoutineSubjectService {
  constructor(
    @inject('RoutineSubjectsRepository')
    private routineSubjectsRepository: IRoutineSubjectsRepository,
  ) {}

  public async execute({ routineSubjects, schoolId }: IRequest) {
    const createData: ICreateRoutineSubjectDTO[] = routineSubjects.map(
      item => ({
        school_id: schoolId,
        ...item,
      }),
    );

    const routineSubject = await this.routineSubjectsRepository.create(
      createData,
    );

    return routineSubject;
  }
}

export { CreateRoutineSubjectService };
