import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateEmployeeDTO } from '../dtos/ICreateEmployeeDTO';
import { IEmployee } from '../models/IEmployee';
import FakeEmployeesRepository from '../repositories/fakes/FakeEmployeesRepository';
import { UpdateEmployeeService } from './UpdateEmployeeService';

let fakeEmployeesRepository: FakeEmployeesRepository;

let updateEmployeeService: UpdateEmployeeService;

let employeeData: ICreateEmployeeDTO;

let employee: IEmployee;

describe('UpdateEmployeeService', () => {
  beforeEach(async () => {
    fakeEmployeesRepository = new FakeEmployeesRepository();

    updateEmployeeService = new UpdateEmployeeService(fakeEmployeesRepository);

    employeeData = {
      name: 'User',
    };

    employee = await fakeEmployeesRepository.create(employeeData);
  });

  it('Should be able to update a employee', async () => {
    const updateEmployeeDate = { name: 'Admin' };

    const updatedEmployee = await updateEmployeeService.execute({
      employeeId: employee.id,
      data: updateEmployeeDate,
    });

    const storedEmployee = await fakeEmployeesRepository.findById(employee.id);

    expect(updatedEmployee).toHaveProperty('id');
    expect(updatedEmployee).toMatchObject(updateEmployeeDate);
    expect(updatedEmployee?.id).toBe(employee.id);
    expect(storedEmployee).toMatchObject(updateEmployeeDate);
  });

  it('Should not be able to update a nonexistent employee', async () => {
    const updateEmployeeDate = { name: 'Admin' };

    await expect(
      updateEmployeeService.execute({
        employeeId: 'nonexistent employee id',
        data: updateEmployeeDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a employee name to a already existent employee name', async () => {
    const anotherEmployeeData = {
      name: 'guest-user',
    };

    const anotherEmployee = await fakeEmployeesRepository.create(anotherEmployeeData);

    await expect(
      updateEmployeeService.execute({
        employeeId: anotherEmployee.id,
        data: { name: employeeData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
