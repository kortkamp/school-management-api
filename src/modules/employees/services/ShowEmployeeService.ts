import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

@injectable()
class ShowEmployeeService {
  constructor(
    @inject('UsersRepository')
    private employeesRepository: IUsersRepository,
  ) {}
  public async execute(employeeId: string) {
    const employee = await this.employeesRepository.findById(employeeId, [
      'address',
    ]);
    if (!employee) {
      throw new ErrorsApp('Employee does not exists', 404);
    }

    return employee;
  }
}

export { ShowEmployeeService };
