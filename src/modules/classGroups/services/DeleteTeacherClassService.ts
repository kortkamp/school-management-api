import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTeacherClassDTO } from '../dtos/ICreateTeacherClassDTO';
import { ITeacherClassesRepository } from '../repositories/ITeacherClassesRepository';

interface IRequest {
  schoolId: string;
  data: ICreateTeacherClassDTO;
}
@injectable()
class DeleteTeacherClassService {
  constructor(
    @inject('TeacherClassesRepository')
    private teacherClassesRepository: ITeacherClassesRepository,
  ) {}
  public async execute({ data, schoolId }: IRequest) {
    const teacherClass = await this.teacherClassesRepository.findByIds({
      ...data,
      school_id: schoolId,
    });

    if (!teacherClass) {
      throw new ErrorsApp(
        'Disciplina/turma não encontrada ou já removida',
        404,
      );
    }

    await this.teacherClassesRepository.delete(teacherClass);
  }
}

export { DeleteTeacherClassService };
