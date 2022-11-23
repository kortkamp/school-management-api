import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterExamsResultsFixFKs1668459838828
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'periodic.exam_results',
      'FKExamResultStudent',
    );
    await queryRunner.createForeignKeys('periodic.exam_results', [
      new TableForeignKey({
        name: 'FKExamResultStudent',
        referencedTableName: 'smsystem.students',
        referencedColumnNames: ['id'],
        columnNames: ['student_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'periodic.exam_results',
      'FKExamResultStudent',
    );
    await queryRunner.createForeignKeys('periodic.exam_results', [
      new TableForeignKey({
        name: 'FKExamResultStudent',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['student_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    ]);
  }
}
