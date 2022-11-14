import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IExam } from '../models/IExam';
import { IExamsRepository } from '../repositories/IExamsRepository';

interface IRequest {
  user: {
    id: string;
  };
  exam_id: string;
}

@injectable()
class ShowExamService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}
  public async execute({ user, exam_id }: IRequest) {
    const exam = await this.examsRepository.show(exam_id);

    if (!exam) {
      throw new ErrorsApp('Avaliação não encontrada', 404);
    }

    return exam;
  }
}

export { ShowExamService };
