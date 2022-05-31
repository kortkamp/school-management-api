import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateExamDTO } from '../dtos/ICreateExamDTO';
import { IExamsRepository } from '../repositories/IExamsRepository';

interface IRequest {
  examId: string;
  data: Partial<ICreateExamDTO>;
}

@injectable()
class UpdateExamService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}
  public async execute({ examId, data }: IRequest) {
    const exam = await this.examsRepository.findById(examId);

    if (!exam) {
      throw new ErrorsApp('Exam not found', 404);
    }

    Object.assign(exam, data);

    await this.examsRepository.save(exam);

    return exam;
  }
}

export { UpdateExamService };
