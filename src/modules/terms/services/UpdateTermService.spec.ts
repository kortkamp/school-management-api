import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTermDTO } from '../dtos/ICreateTermDTO';
import { ITerm } from '../models/ITerm';
import FakeTermsRepository from '../repositories/fakes/FakeTermsRepository';
import { UpdateTermService } from './UpdateTermService';

let fakeTermsRepository: FakeTermsRepository;

let updateTermService: UpdateTermService;

let termData: ICreateTermDTO;

let term: ITerm;

describe('UpdateTermService', () => {
  beforeEach(async () => {
    fakeTermsRepository = new FakeTermsRepository();

    updateTermService = new UpdateTermService(fakeTermsRepository);

    termData = {
      name: 'User',
    };

    term = await fakeTermsRepository.create(termData);
  });

  it('Should be able to update a term', async () => {
    const updateTermDate = { name: 'Admin' };

    const updatedTerm = await updateTermService.execute({
      termId: term.id,
      data: updateTermDate,
    });

    const storedTerm = await fakeTermsRepository.findById(term.id);

    expect(updatedTerm).toHaveProperty('id');
    expect(updatedTerm).toMatchObject(updateTermDate);
    expect(updatedTerm?.id).toBe(term.id);
    expect(storedTerm).toMatchObject(updateTermDate);
  });

  it('Should not be able to update a nonexistent term', async () => {
    const updateTermDate = { name: 'Admin' };

    await expect(
      updateTermService.execute({
        termId: 'nonexistent term id',
        data: updateTermDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a term name to a already existent term name', async () => {
    const anotherTermData = {
      name: 'guest-user',
    };

    const anotherTerm = await fakeTermsRepository.create(anotherTermData);

    await expect(
      updateTermService.execute({
        termId: anotherTerm.id,
        data: { name: termData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
