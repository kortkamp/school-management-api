import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateExams1654010690531 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exams',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'type',
            type: 'varchar(255)',
          },

          {
            name: 'value',
            type: 'integer',
          },

          {
            name: 'weight',
            type: 'integer',
          },

          {
            name: 'teacher_id',
            type: 'uuid',
          },

          {
            name: 'subject_id',
            type: 'uuid',
          },

          {
            name: 'class_id',
            type: 'uuid',
          },

          {
            name: 'date',
            type: 'timestamp with time zone',
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
    await queryRunner.createForeignKeys('exams', [
      new TableForeignKey({
        name: 'FKExamTeacher',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['teacher_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
      new TableForeignKey({
        name: 'FKExamSubject',
        referencedTableName: 'subjects',
        referencedColumnNames: ['id'],
        columnNames: ['subject_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
      new TableForeignKey({
        name: 'FKExamClass',
        referencedTableName: 'class_groups',
        referencedColumnNames: ['id'],
        columnNames: ['class_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('exams', 'FKExamClass');
    await queryRunner.dropForeignKey('exams', 'FKExamSubject');
    await queryRunner.dropForeignKey('exams', 'FKExamTeacher');
    await queryRunner.dropTable('exams');
  }
}
