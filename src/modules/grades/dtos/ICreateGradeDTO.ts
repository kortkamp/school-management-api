import { Segments } from '../models/IGrade';

interface ICreateGradeDTO {
  name: string;
  segment: Segments;
}

export { ICreateGradeDTO };
