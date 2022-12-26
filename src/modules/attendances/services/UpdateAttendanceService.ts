import { ITeachersRepository } from '@modules/teachers/repositories/ITeachersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateAttendanceDTO } from '../dtos/ICreateAttendanceDTO';
import { attendanceStatus } from '../models/IAttendance';
import { IAttendancesRepository } from '../repositories/IAttendancesRepository';

interface IRequest {
  attendanceId: string;
  schoolId: string;
  authUserId: string;
  data: Partial<ICreateAttendanceDTO>;
}

@injectable()
class UpdateAttendanceService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,

    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,
  ) {}
  public async execute({ attendanceId, data, authUserId, schoolId }: IRequest) {
    const teacher = await this.teachersRepository.findByUser(
      schoolId,
      authUserId,
    );

    if (!teacher) {
      throw new ErrorsApp('Apenas professores podem criar avaliações', 400);
    }
    const attendance = await this.attendancesRepository.findById(
      attendanceId,
      schoolId,
      teacher.id,
    );

    if (!attendance) {
      throw new ErrorsApp('Avaliação não encontrada', 404);
    }

    Object.assign(attendance, data);
    if (data.results.length > 0) {
      attendance.status = attendanceStatus.CLOSED;
    }

    await this.attendancesRepository.save(attendance);

    return attendance;
  }
}

export { UpdateAttendanceService };
