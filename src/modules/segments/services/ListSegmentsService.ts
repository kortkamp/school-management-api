import { inject, injectable } from 'tsyringe';

import { ISegmentsRepository } from '../repositories/ISegmentsRepository';

@injectable()
class ListSegmentsService {
  constructor(
    @inject('SegmentsRepository')
    private segmentsRepository: ISegmentsRepository,
  ) {}
  public async execute() {
    const segments = await this.segmentsRepository.getAll();

    return segments;
  }
}

export { ListSegmentsService };
