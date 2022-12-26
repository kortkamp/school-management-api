import { attendanceType } from '../models/IAttendance';

interface ICreateAttendanceDTO {
  type: attendanceType;

  value: number;

  weight: number;

  term_id: string;

  teacher_id: string;

  subject_id: string;

  school_id: string;

  class_group_id: string;

  date: Date;

  results: any[];
}

export { ICreateAttendanceDTO };
