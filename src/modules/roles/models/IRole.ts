export enum RoleTypes {
  SYSTEM_ADMIN = 'system-admin',

  ADMIN = 'admin',

  NEW_USER = 'new-user',

  PRINCIPAL = 'principal',

  SECRETARY = 'secretary',

  TEACHER = 'teacher',

  STUDENT = 'student',

  PARENT = 'parent',
}

interface IRole {
  id: string;

  type: RoleTypes;

  name: string;

  created_at: Date;

  updated_at: Date;
}

export type { IRole };
