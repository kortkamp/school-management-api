import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IAttendance } from '../models/IAttendance';
import { IAttendancesRepository } from '../repositories/IAttendancesRepository';

interface IRequest {
  user: {
    id: string;
  };
  attendance_id: string;
}

@injectable()
class ShowAttendanceService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}
  public async execute({ user, attendance_id }: IRequest) {
    const attendance = await this.attendancesRepository.show(attendance_id);

    if (!attendance) {
      throw new ErrorsApp('Avaliação não encontrada', 404);
    }

    return attendance;
  }
}

export { ShowAttendanceService };
