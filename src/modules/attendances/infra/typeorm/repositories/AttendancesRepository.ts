import { ICreateAttendanceDTO } from '@modules/attendances/dtos/ICreateAttendanceDTO';
import { IListAttendancesDTO } from '@modules/attendances/dtos/IListAttendancesDTO';
import { IAttendancesRepository } from '@modules/attendances/repositories/IAttendancesRepository';
import { Repository } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';

import {
  customRepository,
  tenantWrapper,
} from '@shared/infra/tenantContext/tenantRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { Attendance } from '../models/Attendance';

class AttendancesRepository implements IAttendancesRepository {
  private ormRepository: Repository<Attendance>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Attendance>(Attendance).extend(
      customRepository(Attendance),
    );
  }

  public async getTotal(): Promise<number> {
    const total = await this.ormRepository.count();

    return total;
  }

  public async create(data: ICreateAttendanceDTO): Promise<Attendance> {
    const newAttendance = this.ormRepository.create(data);

    await this.ormRepository.save(newAttendance);

    return newAttendance;
  }

  public async getAll(query: IListAttendancesDTO): Promise<[Attendance[], number]> {
    const { page, per_page, ...where } = query;

    const take = per_page || 10;
    const skip = page ? (page - 1) * per_page : 0;

    return this.ormRepository.findAndCount({
      where,
      take,
      skip,
      relations: [
        'subject',
        'class_group',
        'teacher',
        'teacher.person',
        'term',
      ],
      select: {
        id: true,
        type: true,
        status: true,
        value: true,
        date: true,
        created_at: true,
        subject: {
          id: true,
          name: true,
        },
        class_group: {
          id: true,
          name: true,
        },
        teacher: {
          id: true,
          person: {
            id: true,
            name: true,
          },
        },
        term: {
          id: true,
          name: true,
        },
      },
      order: { created_at: 'DESC' },
    });
  }

  public async getAllByClassSubject(
    subject_id: string,
    class_id: string,
    student_id?: string,
  ): Promise<Attendance[]> {
    const qb = this.ormRepository.createQueryBuilder('attendance');

    qb.andWhere({ subject_id, class_id })
      .select([
        'attendance.id',
        'attendance.type',
        'attendance.status',
        'attendance.value',
        'attendance.weight',
        'attendance.date',
        'attendance.subject_id',
      ])
      .leftJoin('attendance.subject', 'subject')
      .addSelect(['subject.id', 'subject.name'])
      .leftJoin('attendance.class_group', 'class_group')
      .addSelect(['class_group.id', 'class_group.name'])
      .leftJoin('attendance.teacher', 'teacher')
      .addSelect(['teacher.id', 'teacher.name'])

      .leftJoin(
        'attendance.results',
        'results',
        student_id ? 'results.student_id = :student_id' : '',
        {
          student_id,
        },
      )

      .addSelect(['results.value'])
      .leftJoin('results.student', 'student')
      .addSelect(['student.id', 'student.name']);

    // if (student_id) {
    //   qb.andWhere('student.id = :student_id or student.id is null ', {
    //     student_id,
    //   });
    // }

    const result = await qb.getMany();

    return result;
  }

  public async save(data: Attendance): Promise<void> {
    console.log(data);
    await this.ormRepository.save(data);
  }

  public async findById(
    attendance_id: string,
    school_id: string,
    teacher_id: string,
  ): Promise<Attendance | undefined> {
    const attendance = await this.ormRepository.findOne({
      where: { id: attendance_id, school_id, teacher_id },
    });

    return attendance;
  }

  public async show(id: string): Promise<Attendance> {
    const attendances = await this.ormRepository.find({
      where: { id },
      relations: [
        'class_group',
        'results',
        'results.student',
        'results.student.person',
      ],
      select: {
        id: true,
        type: true,
        status: true,
        weight: true,
        date: true,
        class_group: {
          id: true,
          name: true,
        },
        results: {
          achievement: true,
          created_at: true,
          student: {
            id: true,
            person: {
              id: true,
              name: true,
            },
          },
        },
      },
      order: { results: { student: { person: { name: 'ASC' } } } },
    });
    return attendances[0];
  }

  public async delete(attendance: Attendance): Promise<void> {
    await this.ormRepository.remove(attendance);
  }
}

export { AttendancesRepository };
