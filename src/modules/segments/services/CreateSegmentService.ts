import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSegmentDTO } from '../dtos/ICreateSegmentDTO';
import { ISegmentsRepository } from '../repositories/ISegmentsRepository';

@injectable()
class CreateSegmentService {
  constructor(
    @inject('SegmentsRepository')
    private segmentsRepository: ISegmentsRepository,
  ) {}

  public async execute(data: ICreateSegmentDTO) {
    const segmentExists = await this.segmentsRepository.findByName(data.name);

    if (segmentExists) {
      throw new ErrorsApp('Segment already exists', 409);
    }

    const segment = await this.segmentsRepository.create(data);

    return segment;
  }
}

export { CreateSegmentService };
