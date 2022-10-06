import { inject, injectable } from 'tsyringe';

import { IClassGroupsRepository } from '../repositories/IClassGroupsRepository';

@injectable()
class ListClassGroupsService {
  constructor(
    @inject('ClassGroupsRepository')
    private classGroupsRepository: IClassGroupsRepository,
  ) {}
  public async execute(school_id: string) {
    const classGroups = await this.classGroupsRepository.getAll(school_id);

    return classGroups;
  }
}

export { ListClassGroupsService };
