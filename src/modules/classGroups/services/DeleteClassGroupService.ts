import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IClassGroupsRepository } from '../repositories/IClassGroupsRepository';

@injectable()
class DeleteClassGroupService {
  constructor(
    @inject('ClassGroupsRepository')
    private classGroupsRepository: IClassGroupsRepository,
  ) {}
  public async execute(classGroupId: string) {
    const classGroup = await this.classGroupsRepository.findById(classGroupId);
    if (!classGroup) {
      throw new ErrorsApp('ClassGroup does not exists', 404);
    }

    await this.classGroupsRepository.delete(classGroup);
  }
}

export { DeleteClassGroupService };
