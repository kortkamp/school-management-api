import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSegmentDTO } from '../dtos/ICreateSegmentDTO';
import FakeSegmentsRepository from '../repositories/fakes/FakeSegmentsRepository';
import { CreateSegmentService } from './CreateSegmentService';

let fakeSegmentsRepository: FakeSegmentsRepository;

let createSegmentService: CreateSegmentService;

let segmentData: ICreateSegmentDTO;

describe('CreateSegmentService', () => {
  beforeEach(() => {
    fakeSegmentsRepository = new FakeSegmentsRepository();

    createSegmentService = new CreateSegmentService(fakeSegmentsRepository);

    segmentData = {
      name: 'User',
    };
  });

  it('Should be able to create a new segment', async () => {
    const segment = await createSegmentService.execute(segmentData);

    expect(segment).toHaveProperty('id');
    expect(segment).toHaveProperty('name');

    expect(segment?.name).toBe(segmentData.name);
  });

  it('Should not create 2 segments with same name ', async () => {
    await createSegmentService.execute(segmentData);

    await expect(createSegmentService.execute(segmentData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
