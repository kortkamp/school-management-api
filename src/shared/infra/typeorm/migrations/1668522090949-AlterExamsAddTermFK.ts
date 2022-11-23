import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterExamsAddTermFK1668522090949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys('periodic.exams', [
      new TableForeignKey({
        name: 'FKExamTerm',
        referencedTableName: 'periodic.terms',
        referencedColumnNames: ['id'],
        columnNames: ['term_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('periodic.exams', 'FKExamTerm');
  }
}
