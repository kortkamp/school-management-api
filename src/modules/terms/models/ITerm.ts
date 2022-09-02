export enum TermType {
  STANDARD = 'padrão',
  EXTRA = 'extra',
  RECOVERING = 'recuperação',
  FINAL = 'recuperação final',
}

// TODO adicionar recuperacao bimestral, trimestral, semestral para calcularmos a notas de acordo com o tipo de recuperacao

interface ITerm {
  id: string;

  name: string;

  type: TermType;

  start_at: Date;

  end_at: Date;

  school_year_id: string;

  created_at: Date;

  updated_at: Date;
}

export type { ITerm };
