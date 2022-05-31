import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateClassGroupDTO } from '../dtos/ICreateClassGroupDTO';
import { IClassGroupsRepository } from '../repositories/IClassGroupsRepository';

interface IRequest {
  classGroupId: string;
  data: Partial<ICreateClassGroupDTO>;
}

@injectable()
class UpdateClassGroupService {
  constructor(
    @inject('ClassGroupsRepository')
    private classGroupsRepository: IClassGroupsRepository,
  ) {}
  public async execute({ classGroupId, data }: IRequest) {
    const classGroup = await this.classGroupsRepository.findById(classGroupId);

    if (!classGroup) {
      throw new ErrorsApp('ClassGroup not found', 404);
    }

    if (data.name && data.name !== classGroup.name) {
      const classGroupExists = await this.classGroupsRepository.findByName(
        data.name,
      );

      if (classGroupExists) {
        throw new ErrorsApp('ClassGroup name already exists', 409);
      }
    }

    Object.assign(classGroup, data);

    await this.classGroupsRepository.save(classGroup);

    return classGroup;
  }
}

export { UpdateClassGroupService };
