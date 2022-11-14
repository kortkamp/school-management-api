import { ITeachersRepository } from '@modules/teachers/repositories/ITeachersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateExamDTO } from '../dtos/ICreateExamDTO';
import { IExamsRepository } from '../repositories/IExamsRepository';

interface IRequest {
  examId: string;
  schoolId: string;
  authUserId: string;
  data: Partial<ICreateExamDTO>;
}

@injectable()
class UpdateExamService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,

    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,
  ) {}
  public async execute({ examId, data, authUserId, schoolId }: IRequest) {
    const teacher = await this.teachersRepository.findByUser(
      schoolId,
      authUserId,
    );

    if (!teacher) {
      throw new ErrorsApp('Apenas professores podem criar avaliações', 400);
    }
    const exam = await this.examsRepository.findById(
      examId,
      schoolId,
      teacher.id,
    );

    if (!exam) {
      throw new ErrorsApp('Exam not found', 404);
    }

    Object.assign(exam, data);

    await this.examsRepository.save(exam);

    return exam;
  }
}

export { UpdateExamService };
