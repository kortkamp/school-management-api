import { TermType } from '../models/ITerm';

interface ICreateTermDTO {
  name: string;
  type: TermType;
  start_at?: Date;
  end_at?: Date;
  school_year_id: string;
}

export { ICreateTermDTO };
