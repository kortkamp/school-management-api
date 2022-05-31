import { ISubject } from '@modules/subjects/models/ISubject';

interface ISegment {
  id: string;

  name: string;

  subjects: ISubject[];

  created_at: Date;

  updated_at: Date;
}

export { ISegment };
