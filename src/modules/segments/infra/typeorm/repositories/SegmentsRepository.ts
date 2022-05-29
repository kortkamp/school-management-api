import { ICreateSegmentDTO } from '@modules/segments/dtos/ICreateSegmentDTO';
import { ISegmentsRepository } from '@modules/segments/repositories/ISegmentsRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { Segment } from '../models/Segment';

class SegmentsRepository implements ISegmentsRepository {
  private ormRepository: Repository<Segment>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Segment>(Segment);
  }

  public async getTotal(): Promise<number> {
    const result = await this.ormRepository.query(
      'SELECT count(segments.id) as total FROM segments ',
    );

    return result[0].total;
  }

  public async create(data: ICreateSegmentDTO): Promise<Segment> {
    const newSegment = this.ormRepository.create(data);

    await this.ormRepository.save(newSegment);

    return newSegment;
  }

  public async getAll(relations: string[] = []): Promise<Segment[]> {
    return this.ormRepository.find({ relations });
  }

  public async save(data: Segment): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Segment | undefined> {
    const segment = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return segment;
  }

  public async findByName(name: string): Promise<Segment | undefined> {
    const segment = await this.ormRepository.findOne({
      where: { name },
    });

    return segment;
  }

  public async delete(segment: Segment): Promise<void> {
    await this.ormRepository.remove(segment);
  }
}

export { SegmentsRepository };
