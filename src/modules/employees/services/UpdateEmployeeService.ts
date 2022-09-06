import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateEmployeeDTO } from '../dtos/ICreateEmployeeDTO';

interface IRequest {
  employeeId: string;
  data: Partial<ICreateEmployeeDTO>;
}

@injectable()
class UpdateEmployeeService {
  constructor(
    @inject('UsersRepository')
    private employeesRepository: IUsersRepository,
  ) {}
  public async execute({ employeeId, data }: IRequest) {
    const employee = await this.employeesRepository.findById(employeeId);

    if (!employee) {
      throw new ErrorsApp('Employee not found', 404);
    }

    Object.assign(employee, data);

    await this.employeesRepository.save(employee);

    return employee;
  }
}

export { UpdateEmployeeService };
