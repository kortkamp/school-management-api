import { ITeachersRepository } from '@modules/teachers/repositories/ITeachersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateAttendanceDTO } from '../dtos/ICreateAttendanceDTO';
import { IAttendancesRepository } from '../repositories/IAttendancesRepository';

interface IRequest {
  authUserId: string;
  schoolId: string;
  data: ICreateAttendanceDTO;
}

@injectable()
class CreateAttendanceService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,

    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,
  ) {}

  public async execute({ data, authUserId, schoolId }: IRequest) {
    const teacher = await this.teachersRepository.findByUser(
      schoolId,
      authUserId,
    );

    if (!teacher) {
      throw new ErrorsApp('Apenas professores podem criar avaliações', 400);
    }

    const attendance = await this.attendancesRepository.create({
      ...data,
      weight: 1,
      school_id: schoolId,
      teacher_id: teacher.id,
    });

    return attendance;
  }
}

export { CreateAttendanceService };
