import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRoutineAddDuration1661007134808
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE routines RENAME COLUMN end_at TO duration;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE routines RENAME COLUMN duration TO end_at;`,
    );
  }
}
