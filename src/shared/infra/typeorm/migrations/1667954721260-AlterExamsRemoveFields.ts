import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterExamsRemoveFields1667954721260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('periodic.exams', 'FKExamTeacher');
    await queryRunner.dropForeignKey('periodic.exams', 'FKExamSubject');
    await queryRunner.dropForeignKey('periodic.exams', 'FKExamClass');

    await queryRunner.dropColumns('periodic.exams', [
      'sub_type',
      'reference_id',
    ]);

    await queryRunner.changeColumn(
      'periodic.exams',
      'class_id',
      new TableColumn({
        name: 'class_group_id',
        type: 'uuid',
      }),
    );

    await queryRunner.changeColumn(
      'periodic.exams',
      'date',
      new TableColumn({
        name: 'date',
        type: 'date',
      }),
    );

    await queryRunner.changeColumn(
      'periodic.exams',
      'type',
      new TableColumn({
        name: 'type',
        type: 'enum',
        enumName: 'examType',
        enum: [
          'prova',
          'trabalho',
          'seminário',
          'exercício',
          'comportamento',
          'outros',
        ],
      }),
    );

    await queryRunner.createForeignKeys('periodic.exams', [
      new TableForeignKey({
        name: 'FKExamTeacher',
        referencedTableName: 'smsystem.teachers',
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
        referencedTableName: 'smsystem.class_groups',
        referencedColumnNames: ['id'],
        columnNames: ['class_group_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('periodic.exams', 'FKExamTeacher');
    await queryRunner.dropForeignKey('periodic.exams', 'FKExamSubject');
    await queryRunner.dropForeignKey('periodic.exams', 'FKExamClass');

    await queryRunner.changeColumn(
      'periodic.exams',
      'type',
      new TableColumn({
        name: 'type',
        type: 'varchar',
      }),
    );

    await queryRunner.changeColumn(
      'periodic.exams',
      'date',
      new TableColumn({
        name: 'date',
        type: 'timestamp with time zone',
      }),
    );

    await queryRunner.changeColumn(
      'periodic.exams',
      'class_group_id',
      new TableColumn({
        name: 'class_id',
        type: 'uuid',
      }),
    );
    await queryRunner.addColumns('periodic.exams', [
      new TableColumn({
        name: 'reference_id',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'sub_type',
        type: 'enum',
        enumName: 'examSubTypes',
      }),
    ]);

    await queryRunner.createForeignKeys('periodic.exams', [
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
}
