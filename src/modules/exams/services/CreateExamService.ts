import { ITeachersRepository } from '@modules/teachers/repositories/ITeachersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateExamDTO } from '../dtos/ICreateExamDTO';
import { IExamResultsRepository } from '../repositories/IExamResultsRepository';
import { IExamsRepository } from '../repositories/IExamsRepository';

interface IRequest {
  authUserId: string;
  schoolId: string;
  data: ICreateExamDTO;
}

@injectable()
class CreateExamService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,

    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,
  ) {}

  public async execute({ data, authUserId, schoolId }: IRequest) {
    const teacher = await this.teachersRepository.findByUser(
      schoolId,
      authUserId,
    );

    if (!teacher) {
      throw new ErrorsApp('Apenas professores podem criar avaliações', 400);
    }

    const exam = await this.examsRepository.create({
      ...data,
      weight: 1,
      teacher_id: teacher.id,
    });

    return exam;
  }
}

export { CreateExamService };
