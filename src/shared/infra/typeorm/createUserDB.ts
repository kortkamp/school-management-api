import 'dotenv/config';
import { AppDataSource } from '.';

async function create() {
  await AppDataSource.initialize();

  await AppDataSource.query(
    `CREATE USER ${process.env.DATABASE_USER} WITH LOGIN PASSWORD '${process.env.DATABASE_PASSWORD}';
     GRANT ALL PRIVILEGES ON DATABASE ${process.env.DATABASE_DB} to ${process.env.DATABASE_USER};
     GRANT ALL ON schema public TO ${process.env.DATABASE_USER};
     GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public to ${process.env.DATABASE_USER}
    `,
  );

  await AppDataSource.query(
    `ALTER DEFAULT PRIVILEGES 
    FOR USER root
    IN SCHEMA public
    GRANT All ON TABLES TO ${process.env.DATABASE_USER};`,
  );

  await AppDataSource.destroy();
}

create().then(() => console.log('User DB Created!'));
