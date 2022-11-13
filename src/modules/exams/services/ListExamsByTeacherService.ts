import { ITeachersRepository } from '@modules/teachers/repositories/ITeachersRepository';
import { inject, injectable } from 'tsyringe';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IListExamsDTO } from '../dtos/IListExamsDTO';
import { IExamsRepository } from '../repositories/IExamsRepository';

interface IRequest {
  schoolId: string;
  authUserId: string;
  query: IListExamsDTO;
}
@injectable()
class ListExamsByTeacherService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,

    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,
  ) {}
  public async execute({
    schoolId,
    authUserId,
    query,
  }: IRequest): Promise<IListResultInterface> {
    const teacher = await this.teachersRepository.findByUser(
      schoolId,
      authUserId,
    );

    if (!teacher) {
      throw new ErrorsApp('O usuário não é professor', 400);
    }

    const { page = 1, per_page = 10 } = query;

    const [exams, length] = await this.examsRepository.getAll({
      ...query,
      school_id: schoolId,
      teacher_id: teacher.id,
    });

    return {
      result: exams,
      total_filtered: length,
      page,
      per_page,
      total_pages: Math.ceil(length / per_page),
    };
  }
}

export { ListExamsByTeacherService };
