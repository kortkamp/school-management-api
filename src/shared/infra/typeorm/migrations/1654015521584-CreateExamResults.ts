import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateExamResults1654015521584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exam_results',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },

          {
            name: 'value',
            type: 'integer',
          },

          {
            name: 'exam_id',
            type: 'uuid',
          },

          {
            name: 'student_id',
            type: 'uuid',
          },

          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('exam_results', [
      new TableForeignKey({
        name: 'FKExamResultExam',
        referencedTableName: 'exams',
        referencedColumnNames: ['id'],
        columnNames: ['exam_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('exam_results', 'FKExamResultStudent');
    await queryRunner.dropForeignKey('exam_results', 'FKExamResultExam');
    await queryRunner.dropTable('exam_results');
  }
}
