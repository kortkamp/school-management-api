import 'reflect-metadata';

import { ICreateSegmentDTO } from '../dtos/ICreateSegmentDTO';
import FakeSegmentsRepository from '../repositories/fakes/FakeSegmentsRepository';
import { ListSegmentsService } from './ListSegmentsService';

let fakeSegmentsRepository: FakeSegmentsRepository;

let listSegmentsService: ListSegmentsService;

let segmentData: ICreateSegmentDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeSegmentsRepository = new FakeSegmentsRepository();

    listSegmentsService = new ListSegmentsService(fakeSegmentsRepository);

    segmentData = {
      name: 'segment1',
    };
  });

  it('Should be able to list segments', async () => {
    const segment1 = await fakeSegmentsRepository.create(segmentData);

    const segment2 = await fakeSegmentsRepository.create({
      ...segmentData,
      name: 'segment2',
    });

    const segments = await listSegmentsService.execute();

    expect(segments).toEqual([segment1, segment2]);
  });
});
