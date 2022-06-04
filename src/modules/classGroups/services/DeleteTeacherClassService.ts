import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTeacherClassDTO } from '../dtos/ICreateTeacherClassDTO';
import { ITeacherClassesRepository } from '../repositories/ITeacherClassesRepository';

@injectable()
class DeleteTeacherClassService {
  constructor(
    @inject('TeacherClassesRepository')
    private teacherClassesRepository: ITeacherClassesRepository,
  ) {}
  public async execute(data: ICreateTeacherClassDTO) {
    const teacherClass = await this.teacherClassesRepository.findByIds(data);

    if (!teacherClass) {
      throw new ErrorsApp('TeacherClass relation does not exists', 404);
    }

    await this.teacherClassesRepository.delete(teacherClass);
  }
}

export { DeleteTeacherClassService };
