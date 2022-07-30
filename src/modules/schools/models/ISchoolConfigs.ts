export enum TermTypes {
  BIMESTER = 'bimestre',
  TRIMESTER = 'trimestre',
  QUADMESTER = 'quadrimestre',
  SEMESTER = 'semestre',
}

export enum RecoveringPeriod {
  BIMESTER = 'bimestral',
  TRIMESTER = 'trimestral',
  QUADMESTER = 'quadrimestral',
  SEMESTER = 'semestral',
  YEAR = 'anual',
}

export enum RecoveringType {
  MEAN = 'média',
  SUBSTITUTIVE = 'substitutiva',
  GREATER = 'maior',
}

interface ISchoolConfigs {
  school_id: string;

  term_type: TermTypes;

  recovering_period: RecoveringPeriod;

  recovering_type: RecoveringType;

  final_recovering?: RecoveringType;

  class_length: number;

  created_at: Date;

  updated_at: Date;
}

export { ISchoolConfigs };
