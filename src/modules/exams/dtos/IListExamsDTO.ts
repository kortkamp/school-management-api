import { examStatus, examType } from '../models/IExam';

interface IListExamsDTO {
  school_id: string;
  class_group_id?: string;
  status: examStatus;
  type: examType;
  page: number;
  per_page: number;
}

export { IListExamsDTO };
