import { inject, injectable } from 'tsyringe';

import { ICreateExamDTO } from '../dtos/ICreateExamDTO';
import { IExamsRepository } from '../repositories/IExamsRepository';

@injectable()
class CreateExamService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}

  public async execute(data: ICreateExamDTO) {
    const exam = await this.examsRepository.create(data);

    return exam;
  }
}

export { CreateExamService };
