/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
      role: string;
      school_id?: string;
      // only used for students
      class_group_id?: string;
    };
  }
}
