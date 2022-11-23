import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterExamsResultsAddAchievement1668516000937
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('periodic.exam_results', 'value');
    await queryRunner.addColumn(
      'periodic.exam_results',
      new TableColumn({
        name: 'achievement',
        type: 'NUMERIC(5,4)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('periodic.exam_results', 'achievement');
    await queryRunner.addColumn(
      'periodic.exam_results',
      new TableColumn({
        name: 'value',
        type: 'integer',
        isNullable: true,
      }),
    );
  }
}
