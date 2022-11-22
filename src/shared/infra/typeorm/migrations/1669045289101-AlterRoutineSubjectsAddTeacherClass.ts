import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterRoutineSubjectsAddTeacherClass1669045289101
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('periodic.routine_subjects', [
      'subject_id',
      'teacher_id',
      'class_group_id',
    ]);
    await queryRunner.addColumn(
      'periodic.routine_subjects',
      new TableColumn({
        name: 'teacher_class_group_id',
        isPrimary: true,
        type: 'uuid',
      }),
    );
    await queryRunner.createForeignKey(
      'periodic.routine_subjects',
      new TableForeignKey({
        name: 'FKRoutineSubjectTeacherClassGroup',
        referencedTableName: 'periodic.teacher_classes',
        referencedColumnNames: ['id'],
        columnNames: ['teacher_class_group_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'periodic.routine_subjects',
      'FKRoutineSubjectTeacherClassGroup',
    );
    await queryRunner.addColumns('periodic.routine_subjects', [
      new TableColumn({
        name: 'subject_id',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'teacher_id',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'class_group_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);
  }
}
