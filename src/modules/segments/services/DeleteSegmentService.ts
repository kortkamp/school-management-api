import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISegmentsRepository } from '../repositories/ISegmentsRepository';

@injectable()
class DeleteSegmentService {
  constructor(
    @inject('SegmentsRepository')
    private segmentsRepository: ISegmentsRepository,
  ) {}
  public async execute(segmentId: string) {
    const segment = await this.segmentsRepository.findById(segmentId);
    if (!segment) {
      throw new ErrorsApp('Segment does not exists', 404);
    }

    await this.segmentsRepository.delete(segment);
  }
}

export { DeleteSegmentService };
