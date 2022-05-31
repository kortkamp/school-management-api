import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IExamsRepository } from '../repositories/IExamsRepository';

@injectable()
class DeleteExamService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}
  public async execute(examId: string) {
    const exam = await this.examsRepository.findById(examId);
    if (!exam) {
      throw new ErrorsApp('Exam does not exists', 404);
    }

    await this.examsRepository.delete(exam);
  }
}

export { DeleteExamService };
