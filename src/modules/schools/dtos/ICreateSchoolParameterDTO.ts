import {
  RecoveringPeriod,
  RecoveringType,
  ResultCalculation,
  TermPeriod,
} from '../models/ISchoolParameter';

interface ICreateSchoolParameterDTO {
  school_id: string;

  passing_result: number;

  minimum_attendance: number;

  result_calculation: ResultCalculation;

  term_period: TermPeriod;

  term_number: number;

  recovering_period: RecoveringPeriod;

  recovering_type: RecoveringType;

  final_recovering?: RecoveringType;

  class_length: number;
}

export { ICreateSchoolParameterDTO };
