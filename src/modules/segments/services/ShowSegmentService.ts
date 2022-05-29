import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISegmentsRepository } from '../repositories/ISegmentsRepository';

@injectable()
class ShowSegmentService {
  constructor(
    @inject('SegmentsRepository')
    private segmentsRepository: ISegmentsRepository,
  ) {}
  public async execute(segmentId: string) {
    const segment = await this.segmentsRepository.findById(segmentId);
    if (!segment) {
      throw new ErrorsApp('Segment does not exists', 404);
    }

    return segment;
  }
}

export { ShowSegmentService };
