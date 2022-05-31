import 'dotenv/config';
import 'reflect-metadata';
import { ClassGroup } from '@modules/classGroups/infra/typeorm/models/ClassGroup';
import { Exam } from '@modules/exams/infra/typeorm/models/Exam';
import { Grade } from '@modules/grades/infra/typeorm/models/Grade';
import { Role } from '@modules/roles/infra/typeorm/models/Role';
import { School } from '@modules/schools/infra/typeorm/models/School';
import { Segment } from '@modules/segments/infra/typeorm/models/Segment';
import { Subject } from '@modules/subjects/infra/typeorm/models/Subject';
import { UserSubject } from '@modules/subjects/infra/typeorm/models/UserSubject';
import { User } from '@modules/users/infra/typeorm/models/User';
import { UserToken } from '@modules/users/infra/typeorm/models/UserToken';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  name: process.env.POSTGRES_DB_NAME,
  type: 'postgres',
  url: process.env.DATABASE_URL,
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
    Exam,
  ],
  migrations: [`./dist/src/shared/infra/typeorm/migrations/*.js`],
};

export const AppDataSource = new DataSource(dataSourceOptions);
