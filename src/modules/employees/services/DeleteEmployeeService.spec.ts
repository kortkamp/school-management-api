import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IEmployee } from '../models/IEmployee';
import FakeEmployeesRepository from '../repositories/fakes/FakeEmployeesRepository';
import { DeleteEmployeeService } from './DeleteEmployeeService';

let fakeEmployeesRepository: FakeEmployeesRepository;
let deleteEmployeeService: DeleteEmployeeService;
let employee: IEmployee;

describe('DeleteEmployee', () => {
  const newEmployeeData = {
    name: 'employee1',
  };

  beforeEach(async () => {
    fakeEmployeesRepository = new FakeEmployeesRepository();

    deleteEmployeeService = new DeleteEmployeeService(fakeEmployeesRepository);

    employee = await fakeEmployeesRepository.create(newEmployeeData);
  });

  it('should be able to delete a employee', async () => {
    const deleteEmployeeResult = await deleteEmployeeService.execute(employee.id);

    const employees = await fakeEmployeesRepository.getAll();

    expect(employees).toHaveLength(0);

    expect(deleteEmployeeResult).toBeUndefined();
  });

  it('should not be able to delete a employee if it does not exist', async () => {
    await expect(
      deleteEmployeeService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
