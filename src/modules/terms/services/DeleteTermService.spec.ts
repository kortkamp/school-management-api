import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ITerm } from '../models/ITerm';
import FakeTermsRepository from '../repositories/fakes/FakeTermsRepository';
import { DeleteTermService } from './DeleteTermService';

let fakeTermsRepository: FakeTermsRepository;
let deleteTermService: DeleteTermService;
let term: ITerm;

describe('DeleteTerm', () => {
  const newTermData = {
    name: 'term1',
  };

  beforeEach(async () => {
    fakeTermsRepository = new FakeTermsRepository();

    deleteTermService = new DeleteTermService(fakeTermsRepository);

    term = await fakeTermsRepository.create(newTermData);
  });

  it('should be able to delete a term', async () => {
    const deleteTermResult = await deleteTermService.execute(term.id);

    const terms = await fakeTermsRepository.getAll();

    expect(terms).toHaveLength(0);

    expect(deleteTermResult).toBeUndefined();
  });

  it('should not be able to delete a term if it does not exist', async () => {
    await expect(
      deleteTermService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
