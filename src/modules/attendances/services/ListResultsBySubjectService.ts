import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IAttendance } from '../models/IAttendance';
import { IAttendancesRepository } from '../repositories/IAttendancesRepository';

interface IRequest {
  user: {
    id: string;
    role: string;
    school_id?: string;
    class_id?: string;
  };
  subject_id: string;
  class_id: string;
}
@injectable()
class ListResultsBySubjectService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}
  public async execute({
    user,
    subject_id,
    class_id,
  }: IRequest): Promise<IAttendance[]> {
    let student_id: string;
    switch (user.role) {
      case 'admin':
        break;
      case 'teacher':
        break;
      case 'student':
        student_id = user.id;
        break;
      default:
        throw new ErrorsApp('Não autorizado a acessar avaliações', 403);
        break;
    }
    const attendances = await this.attendancesRepository.getAllByClassSubject(
      subject_id,
      class_id,
      student_id,
    );

    return attendances;
  }
}

export { ListResultsBySubjectService };
