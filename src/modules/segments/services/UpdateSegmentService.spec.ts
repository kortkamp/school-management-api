import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSegmentDTO } from '../dtos/ICreateSegmentDTO';
import { ISegment } from '../models/ISegment';
import FakeSegmentsRepository from '../repositories/fakes/FakeSegmentsRepository';
import { UpdateSegmentService } from './UpdateSegmentService';

let fakeSegmentsRepository: FakeSegmentsRepository;

let updateSegmentService: UpdateSegmentService;

let segmentData: ICreateSegmentDTO;

let segment: ISegment;

describe('UpdateSegmentService', () => {
  beforeEach(async () => {
    fakeSegmentsRepository = new FakeSegmentsRepository();

    updateSegmentService = new UpdateSegmentService(fakeSegmentsRepository);

    segmentData = {
      name: 'User',
    };

    segment = await fakeSegmentsRepository.create(segmentData);
  });

  it('Should be able to update a segment', async () => {
    const updateSegmentDate = { name: 'Admin' };

    const updatedSegment = await updateSegmentService.execute({
      segmentId: segment.id,
      data: updateSegmentDate,
    });

    const storedSegment = await fakeSegmentsRepository.findById(segment.id);

    expect(updatedSegment).toHaveProperty('id');
    expect(updatedSegment).toMatchObject(updateSegmentDate);
    expect(updatedSegment?.id).toBe(segment.id);
    expect(storedSegment).toMatchObject(updateSegmentDate);
  });

  it('Should not be able to update a nonexistent segment', async () => {
    const updateSegmentDate = { name: 'Admin' };

    await expect(
      updateSegmentService.execute({
        segmentId: 'nonexistent segment id',
        data: updateSegmentDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a segment name to a already existent segment name', async () => {
    const anotherSegmentData = {
      name: 'guest-user',
    };

    const anotherSegment = await fakeSegmentsRepository.create(anotherSegmentData);

    await expect(
      updateSegmentService.execute({
        segmentId: anotherSegment.id,
        data: { name: segmentData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
