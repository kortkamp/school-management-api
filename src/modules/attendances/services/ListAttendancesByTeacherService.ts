import { ITeachersRepository } from '@modules/teachers/repositories/ITeachersRepository';
import { inject, injectable } from 'tsyringe';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IListAttendancesDTO } from '../dtos/IListAttendancesDTO';
import { IAttendancesRepository } from '../repositories/IAttendancesRepository';

interface IRequest {
  schoolId: string;
  authUserId: string;
  query: IListAttendancesDTO;
}
@injectable()
class ListAttendancesByTeacherService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,

    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,
  ) {}
  public async execute({
    schoolId,
    authUserId,
    query,
  }: IRequest): Promise<IListResultInterface> {
    const teacher = await this.teachersRepository.findByUser(
      schoolId,
      authUserId,
    );

    if (!teacher) {
      throw new ErrorsApp('O usuário não é professor', 400);
    }

    const { page = 1, per_page = 10 } = query;

    const [attendances, length] = await this.attendancesRepository.getAll({
      ...query,
      school_id: schoolId,
      teacher_id: teacher.id,
    });

    return {
      result: attendances,
      total_filtered: length,
      page,
      per_page,
      total_pages: Math.ceil(length / per_page),
    };
  }
}

export { ListAttendancesByTeacherService };
