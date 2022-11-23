import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterRoutineSubjectsChangeSchema1668598227226
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'smsystem.routine_subjects',
      'FKRoutineSubjectClassGroup',
    );
    await queryRunner.dropForeignKey(
      'smsystem.routine_subjects',
      'FKRoutineSubjectRoutine',
    );
    await queryRunner.dropForeignKey(
      'smsystem.routine_subjects',
      'FKRoutineSubjectSubject',
    );
    await queryRunner.dropForeignKey(
      'smsystem.routine_subjects',
      'FKRoutineSubjectsTeacher',
    );

    await queryRunner.query(
      `ALTER TABLE smsystem.routine_subjects
            SET SCHEMA periodic;`,
    );

    await queryRunner.createForeignKeys('periodic.routine_subjects', [
      new TableForeignKey({
        name: 'FKRoutineSubjectRoutine',
        referencedTableName: 'smsystem.routines',
        referencedColumnNames: ['id'],
        columnNames: ['routine_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FKRoutineSubjectSubject',
        referencedTableName: 'public.subjects',
        referencedColumnNames: ['id'],
        columnNames: ['subject_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FKRoutineSubjectClassGroup',
        referencedTableName: 'smsystem.class_groups',
        referencedColumnNames: ['id'],
        columnNames: ['class_group_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FKRoutineSubjectsTeacher',
        referencedTableName: 'smsystem.teachers',
        referencedColumnNames: ['id'],
        columnNames: ['teacher_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'periodic.routine_subjects',
      'FKRoutineSubjectClassGroup',
    );
    await queryRunner.dropForeignKey(
      'periodic.routine_subjects',
      'FKRoutineSubjectRoutine',
    );
    await queryRunner.dropForeignKey(
      'periodic.routine_subjects',
      'FKRoutineSubjectSubject',
    );
    await queryRunner.dropForeignKey(
      'periodic.routine_subjects',
      'FKRoutineSubjectsTeacher',
    );
    await queryRunner.query(
      `ALTER TABLE periodic.routine_subjects
            SET SCHEMA smsystem;`,
    );
    await queryRunner.createForeignKeys('smsystem.routine_subjects', [
      new TableForeignKey({
        name: 'FKRoutineSubjectRoutine',
        referencedTableName: 'smsystem.routines',
        referencedColumnNames: ['id'],
        columnNames: ['routine_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FKRoutineSubjectSubject',
        referencedTableName: 'public.subjects',
        referencedColumnNames: ['id'],
        columnNames: ['subject_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FKRoutineSubjectClassGroup',
        referencedTableName: 'smsystem.class_groups',
        referencedColumnNames: ['id'],
        columnNames: ['class_group_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FKRoutineSubjectsTeacher',
        referencedTableName: 'public.users',
        referencedColumnNames: ['id'],
        columnNames: ['teacher_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }
}
