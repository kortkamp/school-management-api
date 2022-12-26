import { IFilterQuery } from 'typeorm-dynamic-filters';

import { ICreateAttendanceDTO } from '../dtos/ICreateAttendanceDTO';
import { IListAttendancesDTO } from '../dtos/IListAttendancesDTO';
import { IAttendance } from '../models/IAttendance';

interface IAttendancesRepository {
  create(data: ICreateAttendanceDTO): Promise<IAttendance>;
  getAll(query: IListAttendancesDTO): Promise<[IAttendance[], number]>;
  getAllByClassSubject(
    subject_id: string,
    class_group_id: string,
    student_id?: string,
  ): Promise<IAttendance[]>;
  findById(
    attendance_id: string,
    school_id: string,
    teacher_id: string,
  ): Promise<IAttendance | undefined>;
  show(id: string, student_id?: string): Promise<IAttendance | undefined>;
  save(dataUpdate: IAttendance): Promise<void>;
  delete(user: IAttendance): Promise<void>;
  getTotal(): Promise<number>;
}

export { IAttendancesRepository };
