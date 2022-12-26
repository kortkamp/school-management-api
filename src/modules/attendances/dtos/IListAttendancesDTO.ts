import { attendanceStatus, attendanceType } from '../models/IAttendance';

interface IListAttendancesDTO {
  school_id: string;
  teacher_id: string;
  class_group_id?: string;
  status: attendanceStatus;
  type: attendanceType;
  page: number;
  per_page: number;
}

export { IListAttendancesDTO };
