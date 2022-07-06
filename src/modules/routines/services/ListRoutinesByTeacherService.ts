import { inject, injectable } from 'tsyringe';

import { IRoutineSubjectsRepository } from '../repositories/IRoutineSubjectsRepository';

interface IRequest {
  teacher_id: string;
}
@injectable()
class ListRoutinesByTeacherService {
  constructor(
    @inject('RoutineSubjectsRepository')
    private routineSubjectsRepository: IRoutineSubjectsRepository,
  ) {}
  public async execute({ teacher_id }: IRequest) {
    const routineSubjects =
      await this.routineSubjectsRepository.getAllByTeacher(teacher_id);

    return routineSubjects;
  }
}

export { ListRoutinesByTeacherService };
