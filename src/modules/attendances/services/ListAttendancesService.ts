import { inject, injectable } from 'tsyringe';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IListAttendancesDTO } from '../dtos/IListAttendancesDTO';
import { IAttendancesRepository } from '../repositories/IAttendancesRepository';

interface IRequest {
  authSchoolId: string;
  query: IListAttendancesDTO;
}
@injectable()
class ListAttendancesService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}
  public async execute({
    authSchoolId,
    query,
  }: IRequest): Promise<IListResultInterface> {
    const { page = 1, per_page = 10 } = query;

    const [attendances, length] = await this.attendancesRepository.getAll({
      ...query,
      school_id: authSchoolId,
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

export { ListAttendancesService };
