import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTeacherClassDTO } from '../dtos/ICreateTeacherClassDTO';
import { ITeacherClassesRepository } from '../repositories/ITeacherClassesRepository';

interface IData extends Partial<ICreateTeacherClassDTO> {
  id: string;
}

interface IRequest {
  schoolId: string;
  teacherClassesData: IData[];
}

@injectable()
class UpdateTeacherClassService {
  constructor(
    @inject('TeacherClassesRepository')
    private teacherClassesRepository: ITeacherClassesRepository,
  ) {}

  public async execute({ schoolId, teacherClassesData }: IRequest) {
    const ids = teacherClassesData.map(item => item.id);

    const teacherClasses = await this.teacherClassesRepository.findMany(ids);

    // set teacher_class_group_id for each routine of each teacherClass
    const data = teacherClassesData.map(teacherClass => ({
      ...teacherClass,
      routines: teacherClass.routines.map(routineSubject => ({
        ...routineSubject,
        teacher_class_group_id: teacherClass.id,
        school_id: schoolId,
      })),
    }));

    teacherClasses.forEach(teacherClass => {
      const teacherClassData = data.find(item => item.id === teacherClass.id);
      Object.assign(teacherClass, { routines: teacherClassData.routines });
    });

    await this.teacherClassesRepository.save(teacherClasses);

    return teacherClasses;
  }
}

export { UpdateTeacherClassService };
