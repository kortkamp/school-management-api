export enum WeekDay {
  SUNDAY = 'domingo',
  MONDAY = 'segunda-feira',
  TUESDAY = 'terça-feira',
  WEDNESDAY = 'quarta-feira',
  THURSDAY = 'quinta-feira',
  FRIDAY = 'sexta-feira',
  SATURDAY = 'sábado',
}
interface IRoutineSubject {
  id: string;

  routine_id: string;

  subject_id: string;

  class_group_id: string;

  week_day: WeekDay;

  created_at: Date;

  updated_at: Date;
}

export { IRoutineSubject };
