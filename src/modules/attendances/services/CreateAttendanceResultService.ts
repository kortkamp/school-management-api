import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { attendanceStatus } from '../models/IAttendance';
import { IAttendanceResultsRepository } from '../repositories/IAttendanceResultsRepository';
import { IAttendancesRepository } from '../repositories/IAttendancesRepository';

interface IAttendanceResult {
  student_id: string;
  value: number;
}

interface IRequest {
  auth_user_id: string;
  data: {
    attendance_id: string;
    results: IAttendanceResult[];
  };
}

@injectable()
class CreateAttendanceResultService {
  constructor(
    @inject('AttendanceResultsRepository')
    private attendanceResultsRepository: IAttendanceResultsRepository,

    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  public async execute({ data, auth_user_id }: IRequest) {
    const attendance = await this.attendancesRepository.findById(data.attendance_id);

    if (!attendance) {
      throw new ErrorsApp('Avaliação não encontrada', 404);
    }

    if (attendance.teacher_id !== auth_user_id) {
      throw new ErrorsApp(
        'Apenas o professor responsável pode alterar as notas',
        403,
      );
    }

    const createResultsData = data.results.map(result => {
      return {
        attendance_id: data.attendance_id,
        student_id: result.student_id,
        value: result.value,
      };
    });

    const attendanceResult = await this.attendanceResultsRepository.createMany(
      createResultsData,
    );

    attendance.status = attendanceStatus.CLOSED;

    await this.attendancesRepository.save(attendance);

    return attendanceResult;
  }
}

export { CreateAttendanceResultService };
