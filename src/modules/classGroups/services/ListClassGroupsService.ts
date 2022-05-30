import { inject, injectable } from 'tsyringe';

import { IClassGroupsRepository } from '../repositories/IClassGroupsRepository';

@injectable()
class ListClassGroupsService {
  constructor(
    @inject('ClassGroupsRepository')
    private classGroupsRepository: IClassGroupsRepository,
  ) {}
  public async execute() {
    const classGroups = await this.classGroupsRepository.getAll();

    return classGroups;
  }
}

export { ListClassGroupsService };
