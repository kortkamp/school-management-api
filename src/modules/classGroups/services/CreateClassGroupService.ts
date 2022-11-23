import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateClassGroupDTO } from '../dtos/ICreateClassGroupDTO';
import { IClassGroupsRepository } from '../repositories/IClassGroupsRepository';

interface IRequest {
  data: ICreateClassGroupDTO;
  authSchoolId: string;
}

@injectable()
class CreateClassGroupService {
  constructor(
    @inject('ClassGroupsRepository')
    private classGroupsRepository: IClassGroupsRepository,
  ) {}

  public async execute({ authSchoolId, data }: IRequest) {
    const classGroupExists = await this.classGroupsRepository.findByName(
      authSchoolId,
      data.name,
    );

    if (classGroupExists) {
      throw new ErrorsApp('A turma já existe', 409);
    }

    // eslint-disable-next-line no-param-reassign
    data.school_id = authSchoolId;

    const classGroup = await this.classGroupsRepository.create(data);

    return classGroup;
  }
}

export { CreateClassGroupService };
