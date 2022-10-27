import 'dotenv/config';
import { AppDataSource } from '.';

async function create() {
  await AppDataSource.initialize();

  await AppDataSource.query(
    `CREATE USER webapp WITH LOGIN PASSWORD '${process.env.DATABASE_PASSWORD}';
     GRANT ALL PRIVILEGES ON DATABASE ${process.env.DATABASE_DB} to webapp;

     GRANT ALL ON schema public TO webapp;
     GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public to webapp;

     CREATE SCHEMA IF NOT EXISTS smsystem;
     GRANT ALL ON schema smsystem TO webapp;
     GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA smsystem to webapp;

     CREATE SCHEMA IF NOT EXISTS periodic;
     GRANT ALL ON schema periodic TO webapp;
     GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA periodic to webapp;

     alter default privileges in schema public grant all on tables to webapp;
     alter default privileges in schema public grant all on sequences to webapp;

     alter default privileges in schema smsystem grant all on tables to webapp;
     alter default privileges in schema smsystem grant all on sequences to webapp;

     alter default privileges in schema periodic grant all on tables to webapp;
     alter default privileges in schema periodic grant all on sequences to webapp;
    `,
  );

  // await AppDataSource.query(
  //   `ALTER DEFAULT PRIVILEGES
  //    FOR USER root
  //    IN SCHEMA public
  //    GRANT All ON TABLES TO ${process.env.DATABASE_USER};
  //   `,
  // );

  await AppDataSource.destroy();
}

create().then(() => console.log('Database successfully prepared!'));
