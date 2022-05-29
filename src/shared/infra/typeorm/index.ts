import 'dotenv/config';
import 'reflect-metadata';
import { Grade } from '@modules/grades/infra/typeorm/models/Grade';
import { Role } from '@modules/roles/infra/typeorm/models/Role';
import { School } from '@modules/schools/infra/typeorm/models/School';
import { Subject } from '@modules/subjects/infra/typeorm/models/Subject';
import { User } from '@modules/users/infra/typeorm/models/User';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  name: process.env.POSTGRES_DB_NAME,
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl:
    process.env.ENVIRONMENT === 'prod' ? { rejectUnauthorized: false } : false,
  entities: [User, Role, School, Grade, Subject],
  migrations: [`./dist/src/shared/infra/typeorm/migrations/*.js`],
};

export const AppDataSource = new DataSource(dataSourceOptions);
