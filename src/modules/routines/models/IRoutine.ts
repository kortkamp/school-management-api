export enum RoutineType {
  CLASS = 'aula',
  INTERVAL = 'intervalo',
}

interface IRoutine {
  id: string;

  routine_group_id: string;

  type: RoutineType;

  start_at: string;

  duration: string;

  created_at: Date;

  updated_at: Date;
}

export type { IRoutine };
