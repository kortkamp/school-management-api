import { ICreateSegmentDTO } from '../dtos/ICreateSegmentDTO';
import { ISegment } from '../models/ISegment';

interface ISegmentsRepository {
  create(data: ICreateSegmentDTO): Promise<ISegment>;
  getAll(relations?: string[]): Promise<ISegment[]>;
  findById(userId: string, relations?: string[]): Promise<ISegment | undefined>;
  findByName(name: string): Promise<ISegment | undefined>;
  save(dataUpdate: ISegment): Promise<void>;
  delete(user: ISegment): Promise<void>;
  getTotal(): Promise<number>;
}

export { ISegmentsRepository };
