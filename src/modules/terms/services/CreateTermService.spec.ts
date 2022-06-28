import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTermDTO } from '../dtos/ICreateTermDTO';
import FakeTermsRepository from '../repositories/fakes/FakeTermsRepository';
import { CreateTermService } from './CreateTermService';

let fakeTermsRepository: FakeTermsRepository;

let createTermService: CreateTermService;

let termData: ICreateTermDTO;

describe('CreateTermService', () => {
  beforeEach(() => {
    fakeTermsRepository = new FakeTermsRepository();

    createTermService = new CreateTermService(fakeTermsRepository);

    termData = {
      name: 'User',
    };
  });

  it('Should be able to create a new term', async () => {
    const term = await createTermService.execute(termData);

    expect(term).toHaveProperty('id');
    expect(term).toHaveProperty('name');

    expect(term?.name).toBe(termData.name);
  });

  it('Should not create 2 terms with same name ', async () => {
    await createTermService.execute(termData);

    await expect(createTermService.execute(termData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
