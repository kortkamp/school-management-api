export enum RoleTypes {
  SYSTEM_ADMIN = 'system-admin',

  ADMIN = 'admin',

  REGISTER = 'register',

  PRINCIPAL = 'principal',

  SECRETARY = 'secretary',

  TEACHER = 'teacher',

  STUDENT = 'student',

  PARENT = 'parent',
}

interface IRole {
  id: string;

  type: RoleTypes;

  is_employee: boolean;

  name: string;

  created_at: Date;

  updated_at: Date;
}

export type { IRole };
