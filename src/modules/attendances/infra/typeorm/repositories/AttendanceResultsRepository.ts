import { ICreateAttendanceResultDTO } from '@modules/attendances/dtos/ICreateAttendanceResultDTO';
import { IAttendanceResultsRepository } from '@modules/attendances/repositories/IAttendanceResultsRepository';
import { Repository } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';

import { AppDataSource } from '@shared/infra/typeorm';

import { AttendanceResult } from '../models/AttendanceResult';

class AttendanceResultsRepository implements IAttendanceResultsRepository {
  private ormRepository: Repository<AttendanceResult>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<AttendanceResult>(AttendanceResult);
  }

  public async getTotal(): Promise<number> {
    const total = await this.ormRepository.count();

    return total;
  }

  public async create(data: ICreateAttendanceResultDTO): Promise<AttendanceResult> {
    const newAttendanceResult = this.ormRepository.create(data);

    await this.ormRepository.save(newAttendanceResult);

    return newAttendanceResult;
  }

  public async createMany(data: ICreateAttendanceResultDTO[]): Promise<AttendanceResult[]> {
    const newAttendanceResults = this.ormRepository.create(data);

    await this.ormRepository.save(newAttendanceResults);

    return newAttendanceResults;
  }

  public async getAll(query: IFilterQuery): Promise<[AttendanceResult[], number]> {
    const filterQueryBuilder = new FilterBuilder(this.ormRepository, 'user');

    const queryBuilder = filterQueryBuilder.build(query);

    const result = await queryBuilder.getManyAndCount();

    return result;
  }

  public async save(data: AttendanceResult): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findByIds(
    attendance_id: string,
    student_id: string,
    relations?: string[],
  ): Promise<AttendanceResult | undefined> {
    const attendanceResult = await this.ormRepository.findOne({
      where: { attendance_id, student_id },
      relations,
    });

    return attendanceResult;
  }

  public async delete(attendanceResult: AttendanceResult): Promise<void> {
    await this.ormRepository.remove(attendanceResult);
  }
}

export { AttendanceResultsRepository };
