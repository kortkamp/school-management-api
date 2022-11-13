import { ITeachersRepository } from '@modules/teachers/repositories/ITeachersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IExamsRepository } from '../repositories/IExamsRepository';

interface IRequest {
  authUserId: string;
  schoolId: string;
  examId: string;
}

@injectable()
class DeleteExamService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,

    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,
  ) {}
  public async execute({ examId, authUserId, schoolId }: IRequest) {
    const teacher = await this.teachersRepository.findByUser(
      schoolId,
      authUserId,
    );

    if (!teacher) {
      throw new ErrorsApp('Apenas professores podem cancelar avaliações', 400);
    }

    const exam = await this.examsRepository.findById(
      examId,
      schoolId,
      teacher.id,
    );
    if (!exam) {
      throw new ErrorsApp('Avaliação não encontrada', 404);
    }

    await this.examsRepository.delete(exam);
  }
}

export { DeleteExamService };
