interface ISchoolYear {
  id: string;

  school_id: string;

  name: string;

  start_at: Date;

  end_at: Date;

  active: boolean;

  created_at: Date;

  updated_at: Date;
}

export { ISchoolYear };
