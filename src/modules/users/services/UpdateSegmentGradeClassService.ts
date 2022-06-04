import { IClassGroupsRepository } from '@modules/classGroups/repositories/IClassGroupsRepository';
import { IGradesRepository } from '@modules/grades/repositories/IGradesRepository';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { ISegmentsRepository } from '@modules/segments/repositories/ISegmentsRepository';
import { injectable, inject } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUser } from '../models/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  segment_id: string;
  grade_id: string;
  class_group_id: string;
}

@injectable()
class UpdateSegmentGradeClassService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('SegmentsRepository')
    private segmentsRepository: ISegmentsRepository,

    @inject('GradesRepository')
    private gradesRepository: IGradesRepository,

    @inject('ClassGroupsRepository')
    private classGroupsRepository: IClassGroupsRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute(data: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(data.user_id, [
      'subjects',
    ]);

    if (!user) {
      throw new ErrorsApp('User not found', 404);
    }

    const role = await this.rolesRepository.findById(user.role_id);

    if (role.name !== 'student') {
      throw new ErrorsApp(`Action not allowed for role: ${role.name}`, 400);
    }

    const isUpdatingSegment =
      data.segment_id && data.segment_id !== user.segment_id;

    if (isUpdatingSegment) {
      // update all subjects of that student
      const segment = await this.segmentsRepository.findById(data.segment_id, [
        'subjects',
      ]);

      if (!segment) {
        throw new ErrorsApp('Segment not found', 404);
      }

      user.subjects = segment.subjects;
    }

    Object.assign(user, data);

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdateSegmentGradeClassService };
