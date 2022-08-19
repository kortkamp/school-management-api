interface IRoutine {
  id: string;

  routine_group_id: string;

  start_at: string;

  end_at: string;

  created_at: Date;

  updated_at: Date;
}

export { IRoutine };
