import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterExamResultAddSecondPK1654596870054
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('exam_results', 'id');
    await queryRunner.createPrimaryKey('exam_results', [
      'student_id',
      'exam_id',
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropPrimaryKey('exam_results');
    await queryRunner.addColumn(
      'exam_results',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
      }),
    );
  }
}
