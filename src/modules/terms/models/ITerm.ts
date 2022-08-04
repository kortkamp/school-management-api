export enum TermType {
  STANDARD = 'padrão',
  EXTRA = 'extra',
  RECOVERING = 'recuperação',
  FINAL = 'recuperação final',
}

interface ITerm {
  id: string;

  name: string;

  type: TermType;

  start_at: Date;

  end_at: Date;

  school_id: string;

  created_at: Date;

  updated_at: Date;
}

export { ITerm };
