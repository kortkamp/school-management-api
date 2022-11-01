interface ITeacher {
  id: string;

  person_id: string;

  school_id: string;

  active: boolean;

  tenant_id: string;

  created_at: Date;

  updated_at: Date;
}

export { ITeacher };
