import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IClassGroupsRepository } from '../repositories/IClassGroupsRepository';

@injectable()
class ShowClassGroupService {
  constructor(
    @inject('ClassGroupsRepository')
    private classGroupsRepository: IClassGroupsRepository,
  ) {}
  public async execute(classGroupId: string, school_id: string) {
    const classGroup = await this.classGroupsRepository.findById(
      classGroupId,
      school_id,
    );
    if (!classGroup) {
      throw new ErrorsApp('Turma não encontrada', 404);
    }

    return classGroup;
  }
}

export { ShowClassGroupService };
