export enum IUserSubjectType {
  TEACHER = 'teacher',
  STUDENT = 'student',
}

interface IUserSubject {
  user_id: string;

  subject_id: string;

  type: IUserSubjectType;

  created_at: Date;
}

export { IUserSubject };
