interface ICreateRoutineDTO {
  type: string;

  routine_group_id: string;

  start_at: string;

  end_at: string;

  date: Date;
}

export { ICreateRoutineDTO };
