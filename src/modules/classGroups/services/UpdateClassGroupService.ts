import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateClassGroupDTO } from '../dtos/ICreateClassGroupDTO';
import { IClassGroupsRepository } from '../repositories/IClassGroupsRepository';

interface IRequest {
  classGroupId: string;
  schoolId: string;
  data: Partial<ICreateClassGroupDTO>;
}

@injectable()
class UpdateClassGroupService {
  constructor(
    @inject('ClassGroupsRepository')
    private classGroupsRepository: IClassGroupsRepository,
  ) {}
  public async execute({ schoolId, classGroupId, data }: IRequest) {
    const classGroup = await this.classGroupsRepository.findById(
      classGroupId,
      schoolId,
    );

    if (!classGroup) {
      throw new ErrorsApp('Turma não encontrada', 404);
    }

    if (data.name && data.name !== classGroup.name) {
      const classGroupExists = await this.classGroupsRepository.findByName(
        schoolId,
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
