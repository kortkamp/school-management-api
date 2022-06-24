import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

@injectable()
class ShowStudentService {
  constructor(
    @inject('UsersRepository')
    private studentsRepository: IUsersRepository,
  ) {}
  public async execute(studentId: string) {
    const student = await this.studentsRepository.findById(studentId, [
      'role',
      'subjects',
      'grade',
      'segment',
      'classGroup',
      'teachingClasses',
    ]);
    if (!student || student.role.name !== 'student') {
      throw new ErrorsApp('Student does not exists', 404);
    }

    return student;
  }
}

export { ShowStudentService };
