import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRoutinesSetDatesNullable1660904989506
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE routines ALTER COLUMN start_at DROP NOT NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE routines ALTER COLUMN end_at DROP NOT NULL;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE routines ALTER COLUMN start_at SET NOT NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE routines ALTER COLUMN end_at SET NOT NULL;',
    );
  }
}
