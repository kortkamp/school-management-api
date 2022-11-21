import { IClassGroupsRepository } from '@modules/classGroups/repositories/IClassGroupsRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IRoutinesRepository } from '../repositories/IRoutinesRepository';

interface IRequest {
  classGroupId: string;
  schoolId: string;
}
@injectable()
class ListRoutinesByClassGroup {
  constructor(
    // @inject('RoutineSubjectsRepository')
    // private routineSubjectsRepository: IRoutineSubjectsRepository,

    @inject('ClassGroupsRepository')
    private classGroupsRepository: IClassGroupsRepository,

    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,
  ) {}
  public async execute({ schoolId, classGroupId }: IRequest) {
    const classGroup = await this.classGroupsRepository.findById(
      classGroupId,
      schoolId,
    );

    if (!classGroup) {
      throw new ErrorsApp('Turma não encontrada', 404);
    }

    const routineGroupId = classGroup.routineGroup?.id;

    if (!routineGroupId) {
      return [];
    }

    const routineSubjects = await this.routinesRepository.getAllByClassGroup(
      schoolId,
      routineGroupId,
      classGroupId,
    );

    return routineSubjects;
  }
}

export { ListRoutinesByClassGroup };
