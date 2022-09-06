import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateEmployeeDTO } from '../dtos/ICreateEmployeeDTO';
import FakeEmployeesRepository from '../repositories/fakes/FakeEmployeesRepository';
import { CreateEmployeeService } from './CreateEmployeeService';

let fakeEmployeesRepository: FakeEmployeesRepository;

let createEmployeeService: CreateEmployeeService;

let employeeData: ICreateEmployeeDTO;

describe('CreateEmployeeService', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeEmployeesRepository();

    createEmployeeService = new CreateEmployeeService(fakeEmployeesRepository);

    employeeData = {
      name: 'User',
    };
  });

  it('Should be able to create a new employee', async () => {
    const employee = await createEmployeeService.execute(employeeData);

    expect(employee).toHaveProperty('id');
    expect(employee).toHaveProperty('name');

    expect(employee?.name).toBe(employeeData.name);
  });

  it('Should not create 2 employees with same name ', async () => {
    await createEmployeeService.execute(employeeData);

    await expect(createEmployeeService.execute(employeeData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
