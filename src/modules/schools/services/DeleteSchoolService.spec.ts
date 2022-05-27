import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISchool } from '../models/ISchool';
import FakeSchoolsRepository from '../repositories/fakes/FakeSchoolsRepository';
import { DeleteSchoolService } from './DeleteSchoolService';

let fakeSchoolsRepository: FakeSchoolsRepository;
let deleteSchoolService: DeleteSchoolService;
let school: ISchool;

describe('DeleteSchool', () => {
  const newSchoolData = {
    name: 'School1',
  };

  beforeEach(async () => {
    fakeSchoolsRepository = new FakeSchoolsRepository();

    deleteSchoolService = new DeleteSchoolService(fakeSchoolsRepository);

    school = await fakeSchoolsRepository.create(newSchoolData);
  });

  it('should be able to delete a School', async () => {
    const deleteSchoolResult = await deleteSchoolService.execute(school.id);

    const Schools = await fakeSchoolsRepository.getAll();

    expect(Schools).toHaveLength(0);

    expect(deleteSchoolResult).toBeUndefined();
  });

  it('should not be able to delete a School if it does not exist', async () => {
    await expect(
      deleteSchoolService.execute('school non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
