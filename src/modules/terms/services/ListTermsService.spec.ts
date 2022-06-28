import 'reflect-metadata';

import { ICreateTermDTO } from '../dtos/ICreateTermDTO';
import FakeTermsRepository from '../repositories/fakes/FakeTermsRepository';
import { ListTermsService } from './ListTermsService';

let fakeTermsRepository: FakeTermsRepository;

let listTermsService: ListTermsService;

let termData: ICreateTermDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeTermsRepository = new FakeTermsRepository();

    listTermsService = new ListTermsService(fakeTermsRepository);

    termData = {
      name: 'term1',
    };
  });

  it('Should be able to list terms', async () => {
    const term1 = await fakeTermsRepository.create(termData);

    const term2 = await fakeTermsRepository.create({
      ...termData,
      name: 'term2',
    });

    const terms = await listTermsService.execute();

    expect(terms).toEqual([term1, term2]);
  });
});
