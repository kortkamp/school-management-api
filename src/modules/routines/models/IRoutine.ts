export enum DayTime {
  MORNING = 'manhã',
  AFTERNOON = 'tarde',
  NIGHT = 'noite',
}

interface IRoutine {
  id: string;

  day_time: DayTime;

  school_id: string;

  start_at: string;

  end_at: string;

  created_at: Date;

  updated_at: Date;
}

export { IRoutine };
