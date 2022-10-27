import '@shared/container/providers';

import { AddressesRepository } from '@modules/addresses/infra/typeorm/repositories/AddressesRepository';
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { ClassGroupsRepository } from '@modules/classGroups/infra/typeorm/repositories/ClassGroupsRepository';
import { TeacherClassesRepository } from '@modules/classGroups/infra/typeorm/repositories/TeacherClasssRepository';
import { IClassGroupsRepository } from '@modules/classGroups/repositories/IClassGroupsRepository';
import { ITeacherClassesRepository } from '@modules/classGroups/repositories/ITeacherClassesRepository';
import { CoursesRepository } from '@modules/courses/infra/typeorm/repositories/CoursesRepository';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { ExamResultsRepository } from '@modules/exams/infra/typeorm/repositories/ExamResultsRepository';
import { ExamsRepository } from '@modules/exams/infra/typeorm/repositories/ExamsRepository';
import { IExamResultsRepository } from '@modules/exams/repositories/IExamResultsRepository';
import { IExamsRepository } from '@modules/exams/repositories/IExamsRepository';
import { GradesRepository } from '@modules/grades/infra/typeorm/repositories/GradesRepository';
import { IGradesRepository } from '@modules/grades/repositories/IGradesRepository';
import { MessagesRepository } from '@modules/messages/infra/typeorm/repositories/MessagesRepository';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { PersonsRepository } from '@modules/persons/infra/typeorm/repositories/PersonsRepository';
import { IPersonsRepository } from '@modules/persons/repositories/IPersonsRepository';
import { RolesRepository } from '@modules/roles/infra/typeorm/repositories/RolesRepository';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { RoutineGroupsRepository } from '@modules/routines/infra/typeorm/repositories/RoutineGroupsRepository';
import { RoutinesRepository } from '@modules/routines/infra/typeorm/repositories/RoutinesRepository';
import { RoutineSubjectsRepository } from '@modules/routines/infra/typeorm/repositories/RoutineSubjectsRepository';
import { IRoutineGroupsRepository } from '@modules/routines/repositories/IRoutineGroupsRepository';
import { IRoutinesRepository } from '@modules/routines/repositories/IRoutinesRepository';
import { IRoutineSubjectsRepository } from '@modules/routines/repositories/IRoutineSubjectsRepository';
import { SchoolParametersRepository } from '@modules/schools/infra/typeorm/repositories/SchoolParametersRepository';
import { SchoolsRepository } from '@modules/schools/infra/typeorm/repositories/SchoolsRepository';
import { ISchoolParametersRepository } from '@modules/schools/repositories/ISchoolParametersRepository';
import { ISchoolsRepository } from '@modules/schools/repositories/ISchoolsRepository';
import { SchoolYearsRepository } from '@modules/schoolYears/infra/typeorm/repositories/SchoolYearsRepository';
import { ISchoolYearsRepository } from '@modules/schoolYears/repositories/ISchoolYearsRepository';
import { SegmentsRepository } from '@modules/segments/infra/typeorm/repositories/SegmentsRepository';
import { ISegmentsRepository } from '@modules/segments/repositories/ISegmentsRepository';
import { SubjectsRepository } from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';
import { UserSubjectsRepository } from '@modules/subjects/infra/typeorm/repositories/UserSubjectsRepository';
import { ISubjectsRepository } from '@modules/subjects/repositories/ISubjectsRepository';
import { IUserSubjectsRepository } from '@modules/subjects/repositories/IUserSubjectsRepository';
import { TenantsRepository } from '@modules/tenants/infra/typeorm/repositories/TenantsRepository';
import { ITenantsRepository } from '@modules/tenants/repositories/ITenantsRepository';
import { TermsRepository } from '@modules/terms/infra/typeorm/repositories/TermsRepository';
import { ITermsRepository } from '@modules/terms/repositories/ITermsRepository';
import { UserSchoolRoleRepositories } from '@modules/users/infra/typeorm/repositories/UserSchoolRoleRepositories';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { IUserSchoolRoleRepositories } from '@modules/users/repositories/IUserSchoolRoleRepositories';
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

container.registerSingleton<IClassGroupsRepository>(
  'ClassGroupsRepository',
  ClassGroupsRepository,
);

container.registerSingleton<IExamsRepository>(
  'ExamsRepository',
  ExamsRepository,
);

container.registerSingleton<IExamResultsRepository>(
  'ExamResultsRepository',
  ExamResultsRepository,
);

container.registerSingleton<ITeacherClassesRepository>(
  'TeacherClassesRepository',
  TeacherClassesRepository,
);

container.registerSingleton<ITermsRepository>(
  'TermsRepository',
  TermsRepository,
);

container.registerSingleton<IRoutinesRepository>(
  'RoutinesRepository',
  RoutinesRepository,
);

container.registerSingleton<IRoutineSubjectsRepository>(
  'RoutineSubjectsRepository',
  RoutineSubjectsRepository,
);

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository,
);

container.registerSingleton<IUserSchoolRoleRepositories>(
  'UserSchoolRoleRepositories',
  UserSchoolRoleRepositories,
);

container.registerSingleton<IMessagesRepository>(
  'MessagesRepository',
  MessagesRepository,
);

container.registerSingleton<ISchoolParametersRepository>(
  'SchoolParametersRepository',
  SchoolParametersRepository,
);

container.registerSingleton<IRoutineGroupsRepository>(
  'RoutineGroupsRepository',
  RoutineGroupsRepository,
);

container.registerSingleton<ISchoolYearsRepository>(
  'SchoolYearsRepository',
  SchoolYearsRepository,
);

container.registerSingleton<ICoursesRepository>(
  'CoursesRepository',
  CoursesRepository,
);

container.registerSingleton<ITenantsRepository>(
  'TenantsRepository',
  TenantsRepository,
);

container.registerSingleton<IPersonsRepository>(
  'PersonsRepository',
  PersonsRepository,
);
