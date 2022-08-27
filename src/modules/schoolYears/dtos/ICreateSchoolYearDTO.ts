interface ICreateSchoolYearDTO {
  school_id: string;

  name: string;

  start_at: Date;

  end_at: Date;

  active: boolean;
}

export { ICreateSchoolYearDTO };
