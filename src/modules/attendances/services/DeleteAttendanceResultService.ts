import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IAttendanceResultsRepository } from '../repositories/IAttendanceResultsRepository';

@injectable()
class DeleteAttendanceResultService {
  constructor(
    @inject('AttendanceResultsRepository')
    private attendanceResultsRepository: IAttendanceResultsRepository,
  ) {}
  public async execute(attendanceResultId: string) {
    const attendanceResult = await this.attendanceResultsRepository.findById(attendanceResultId);
    if (!attendanceResult) {
      throw new ErrorsApp('AttendanceResult does not exists', 404);
    }

    await this.attendanceResultsRepository.delete(attendanceResult);
  }
}

export { DeleteAttendanceResultService };
