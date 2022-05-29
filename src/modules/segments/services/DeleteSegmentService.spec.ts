import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISegment } from '../models/ISegment';
import FakeSegmentsRepository from '../repositories/fakes/FakeSegmentsRepository';
import { DeleteSegmentService } from './DeleteSegmentService';

let fakeSegmentsRepository: FakeSegmentsRepository;
let deleteSegmentService: DeleteSegmentService;
let segment: ISegment;

describe('DeleteSegment', () => {
  const newSegmentData = {
    name: 'segment1',
  };

  beforeEach(async () => {
    fakeSegmentsRepository = new FakeSegmentsRepository();

    deleteSegmentService = new DeleteSegmentService(fakeSegmentsRepository);

    segment = await fakeSegmentsRepository.create(newSegmentData);
  });

  it('should be able to delete a segment', async () => {
    const deleteSegmentResult = await deleteSegmentService.execute(segment.id);

    const segments = await fakeSegmentsRepository.getAll();

    expect(segments).toHaveLength(0);

    expect(deleteSegmentResult).toBeUndefined();
  });

  it('should not be able to delete a segment if it does not exist', async () => {
    await expect(
      deleteSegmentService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
