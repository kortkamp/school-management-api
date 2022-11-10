import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterExamsAlterValueWeightType1668097463965
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table periodic.exams alter value type NUMERIC(7,2)',
    );
    await queryRunner.query(
      'alter table periodic.exams alter weight type NUMERIC(5,2)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table periodic.exams alter value type integer',
    );
    await queryRunner.query(
      'alter table periodic.exams alter weight type integer',
    );
  }
}
