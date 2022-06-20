import { inject, injectable } from 'tsyringe';

import { ITeacherClass } from '../models/ITeacherClass';
import { ITeacherClassesRepository } from '../repositories/ITeacherClassesRepository';

@injectable()
class ListTeacherClassesByTeacherService {
  constructor(
    @inject('TeacherClassesRepository')
    private teacherClassesRepository: ITeacherClassesRepository,
  ) {}
  public async execute(teacher_id: string): Promise<ITeacherClass[]> {
    const teacherClasses = await this.teacherClassesRepository.getAllByTeacher(
      teacher_id,
    );

    return teacherClasses;
  }
}

export { ListTeacherClassesByTeacherService };
