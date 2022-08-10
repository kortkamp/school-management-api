export enum TermPeriod {
  BIMESTER = 'bimestre',
  TRIMESTER = 'trimestre',
  QUADMESTER = 'quadrimestre',
  SEMESTER = 'semestre',
  YEAR = 'ano',
}

export enum RecoveringPeriod {
  BIMESTER = 'bimestral',
  TRIMESTER = 'trimestral',
  QUADMESTER = 'quadrimestral',
  SEMESTER = 'semestral',
  YEAR = 'anual',
}

export enum RecoveringType {
  SUM = 'soma',
  MEAN = 'média',
  SUBSTITUTIVE = 'substitutiva',
  GREATER = 'maior nota',
}

export enum ResultCalculation {
  SUM = 'somatório',
  MEAN = 'média',
}

interface ISchoolParameter {
  school_id: string;

  result_calculation: ResultCalculation;

  passing_result: number;

  minimum_attendance: number;

  term_period: TermPeriod;

  term_number: number;

  recovering_period: RecoveringPeriod;

  recovering_type: RecoveringType;

  final_recovering?: RecoveringType;

  class_length: number;

  created_at: Date;

  updated_at: Date;
}

export type { ISchoolParameter };
