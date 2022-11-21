import { IRoutineGroup } from '@modules/routines/models/IRoutineGroup';

interface IClassGroup {
  id: string;

  name: string;

  school_id: string;

  course_id: string;

  grade_id: string;

  routine_group_id: string;

  routineGroup: IRoutineGroup;

  tenant_id: string;

  created_at: Date;

  updated_at: Date;
}

export { IClassGroup };
