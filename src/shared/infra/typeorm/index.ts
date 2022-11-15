import 'dotenv/config';
import 'reflect-metadata';
import { Address } from '@modules/addresses/infra/typeorm/models/Address';
import { ClassGroup } from '@modules/classGroups/infra/typeorm/models/ClassGroup';
import { TeacherClass } from '@modules/classGroups/infra/typeorm/models/TeacherClass';
import { Contact } from '@modules/contacts/infra/typeorm/models/Contact';
import { Course } from '@modules/courses/infra/typeorm/models/Course';
import { Exam } from '@modules/exams/infra/typeorm/models/Exam';
import { ExamResult } from '@modules/exams/infra/typeorm/models/ExamResult';
import { Grade } from '@modules/grades/infra/typeorm/models/Grade';
import { Message } from '@modules/messages/infra/typeorm/models/Message';
import { Person } from '@modules/persons/infra/typeorm/models/Person';
import { Role } from '@modules/roles/infra/typeorm/models/Role';
import { Routine } from '@modules/routines/infra/typeorm/models/Routine';
import { RoutineGroup } from '@modules/routines/infra/typeorm/models/RoutineGroup';
import { RoutineSubject } from '@modules/routines/infra/typeorm/models/RoutineSubject';
import { School } from '@modules/schools/infra/typeorm/models/School';
import { SchoolParameter } from '@modules/schools/infra/typeorm/models/SchoolParameter';
import { SchoolYear } from '@modules/schoolYears/infra/typeorm/models/SchoolYear';
import { Segment } from '@modules/segments/infra/typeorm/models/Segment';
import { Student } from '@modules/students/infra/typeorm/models/Student';
import { Subject } from '@modules/subjects/infra/typeorm/models/Subject';
import { UserSubject } from '@modules/subjects/infra/typeorm/models/UserSubject';
import { Teacher } from '@modules/teachers/infra/typeorm/models/Teacher';
import { Tenant } from '@modules/tenants/infra/typeorm/models/Tenant';
import { Term } from '@modules/terms/infra/typeorm/models/Term';
import { User } from '@modules/users/infra/typeorm/models/User';
import { UserSchoolRole } from '@modules/users/infra/typeorm/models/UserSchoolRole';
import { UserToken } from '@modules/users/infra/typeorm/models/UserToken';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  name: process.env.POSTGRES_DB_NAME,
  type: 'postgres',
  logging: true,
  url:
    process.env.MIGRATION === 'TRUE'
      ? process.env.DATABASE_ROOT_URL
      : process.env.DATABASE_URL,
  ssl:
    process.env.ENVIRONMENT === 'prod' ? { rejectUnauthorized: false } : false,
  entities: [
    User,
    UserToken,
    Role,
    School,
    Grade,
    Subject,
    UserSubject,
    Segment,
    ClassGroup,
    TeacherClass,
    Exam,
    ExamResult,
    Term,
    Routine,
    RoutineSubject,
    Address,
    UserSchoolRole,
    Message,
    SchoolParameter,
    RoutineGroup,
    SchoolYear,
    Course,
    Tenant,
    Person,
    Student,
    Teacher,
    Contact,
  ],
  migrations: [`./dist/src/shared/infra/typeorm/migrations/*.js`],
};

export const AppDataSource = new DataSource(dataSourceOptions);
