import { ITeachersRepository } from '@modules/teachers/repositories/ITeachersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IAttendancesRepository } from '../repositories/IAttendancesRepository';

interface IRequest {
  authUserId: string;
  schoolId: string;
  attendanceId: string;
}

@injectable()
class DeleteAttendanceService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,

    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,
  ) {}
  public async execute({ attendanceId, authUserId, schoolId }: IRequest) {
    const teacher = await this.teachersRepository.findByUser(
      schoolId,
      authUserId,
    );

    if (!teacher) {
      throw new ErrorsApp('Apenas professores podem cancelar avaliações', 400);
    }

    const attendance = await this.attendancesRepository.findById(
      attendanceId,
      schoolId,
      teacher.id,
    );
    if (!attendance) {
      throw new ErrorsApp('Avaliação não encontrada', 404);
    }

    await this.attendancesRepository.delete(attendance);
  }
}

export { DeleteAttendanceService };
