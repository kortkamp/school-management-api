import { inject, injectable } from 'tsyringe';

import { IClassGroup } from '../models/IClassGroup';
import { IClassGroupsRepository } from '../repositories/IClassGroupsRepository';

@injectable()
class ListTeacherClassesByTeacherService {
  constructor(
    @inject('ClassGroupsRepository')
    private classGroupsRepository: IClassGroupsRepository,
  ) {}
  public async execute(teacher_id: string): Promise<IClassGroup[]> {
    console.log('>>>>', teacher_id);
    const teacherClasses = await this.classGroupsRepository.getAllByTeacher(
      teacher_id,
    );

    return teacherClasses;
  }
}

export { ListTeacherClassesByTeacherService };
