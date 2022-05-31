import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateClassGroupDTO } from '../dtos/ICreateClassGroupDTO';
import { IClassGroupsRepository } from '../repositories/IClassGroupsRepository';

@injectable()
class CreateClassGroupService {
  constructor(
    @inject('ClassGroupsRepository')
    private classGroupsRepository: IClassGroupsRepository,
  ) {}

  public async execute(data: ICreateClassGroupDTO) {
    const classGroupExists = await this.classGroupsRepository.findByName(
      data.name,
    );

    if (classGroupExists) {
      throw new ErrorsApp('ClassGroup already exists', 409);
    }

    const classGroup = await this.classGroupsRepository.create(data);

    return classGroup;
  }
}

export { CreateClassGroupService };
