import 'reflect-metadata';

import { ICreateEmployeeDTO } from '../dtos/ICreateEmployeeDTO';
import FakeEmployeesRepository from '../repositories/fakes/FakeEmployeesRepository';
import { ListEmployeesService } from './ListEmployeesService';

let fakeEmployeesRepository: FakeEmployeesRepository;

let listEmployeesService: ListEmployeesService;

let employeeData: ICreateEmployeeDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeEmployeesRepository();

    listEmployeesService = new ListEmployeesService(fakeEmployeesRepository);

    employeeData = {
      name: 'employee1',
    };
  });

  it('Should be able to list employees', async () => {
    const employee1 = await fakeEmployeesRepository.create(employeeData);

    const employee2 = await fakeEmployeesRepository.create({
      ...employeeData,
      name: 'employee2',
    });

    const employees = await listEmployeesService.execute();

    expect(employees).toEqual([employee1, employee2]);
  });
});
