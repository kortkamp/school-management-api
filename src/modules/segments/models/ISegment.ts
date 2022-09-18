import { ISubject } from '@modules/subjects/models/ISubject';

interface ISegment {
  id: string;

  name: string;

  // quantidade de anos do segmento
  phases_number: number;

  // phase
  phase_name: string;

  // ano escolar em que se inicial o segmento
  // ex: Fundamental II inicia no sexto ano
  starting_phase: number;

  subjects: ISubject[];

  created_at: Date;

  updated_at: Date;
}

export { ISegment };
