import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRoutinesSetTimeNoTZ1660906869328
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table "routines" alter "start_at" type "time" ',
    );
    await queryRunner.query(
      'alter table "routines" alter "end_at" type "time" ',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table "routines" alter "start_at" type "timetz" ',
    );
    await queryRunner.query(
      'alter table "routines" alter "end_at" type "timetz" ',
    );
  }
}
