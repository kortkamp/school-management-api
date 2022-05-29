import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSegmentDTO } from '../dtos/ICreateSegmentDTO';
import { ISegmentsRepository } from '../repositories/ISegmentsRepository';

interface IRequest {
  segmentId: string;
  data: Partial<ICreateSegmentDTO>;
}

@injectable()
class UpdateSegmentService {
  constructor(
    @inject('SegmentsRepository')
    private segmentsRepository: ISegmentsRepository,
  ) {}
  public async execute({ segmentId, data }: IRequest) {
    const segment = await this.segmentsRepository.findById(segmentId);

    if (!segment) {
      throw new ErrorsApp('Segment not found', 404);
    }

    if (data.name && data.name !== segment.name) {
      const segmentExists = await this.segmentsRepository.findByName(data.name);

      if (segmentExists) {
        throw new ErrorsApp('Segment name already exists', 409);
      }
    }

    Object.assign(segment, data);

    await this.segmentsRepository.save(segment);

    return segment;
  }
}

export { UpdateSegmentService };
