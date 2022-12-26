interface IAttendanceResult {
  student_id: string;

  attendance_id: string;

  status: boolean;

  created_at: Date;

  updated_at: Date;
}

export { IAttendanceResult };
