import '@shared/container/providers';

import { GradesRepository } from '@modules/grades/infra/typeorm/repositories/GradesRepository';
import { IGradesRepository } from '@modules/grades/repositories/IGradesRepository';
import { RolesRepository } from '@modules/roles/infra/typeorm/repositories/RolesRepository';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { SchoolsRepository } from '@modules/schools/infra/typeorm/repositories/SchoolsRepository';
import { ISchoolsRepository } from '@modules/schools/repositories/ISchoolsRepository';
import { SegmentsRepository } from '@modules/segments/infra/typeorm/repositories/SegmentsRepository';
import { ISegmentsRepository } from '@modules/segments/repositories/ISegmentsRepository';
import { SubjectsRepository } from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';
import { UserSubjectsRepository } from '@modules/subjects/infra/typeorm/repositories/UserSubjectsRepository';
import { ISubjectsRepository } from '@modules/subjects/repositories/ISubjectsRepository';
import { IUserSubjectsRepository } from '@modules/subjects/repositories/IUserSubjectsRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<ISchoolsRepository>(
  'SchoolsRepository',
  SchoolsRepository,
);

container.registerSingleton<IGradesRepository>(
  'GradesRepository',
  GradesRepository,
);

container.registerSingleton<ISubjectsRepository>(
  'SubjectsRepository',
  SubjectsRepository,
);

container.registerSingleton<ISegmentsRepository>(
  'SegmentsRepository',
  SegmentsRepository,
);

container.registerSingleton<IUserSubjectsRepository>(
  'UserSubjectsRepository',
  UserSubjectsRepository,
);
