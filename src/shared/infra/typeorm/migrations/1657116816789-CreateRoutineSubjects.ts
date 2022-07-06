import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRoutineSubjects1657116816789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'routine_subjects',
        columns: [
          {
            name: 'routine_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'subject_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'class_group_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'week_day',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'FKRoutineSubjectRoutine',
            referencedTableName: 'routines',
            referencedColumnNames: ['id'],
            columnNames: ['routine_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'FKRoutineSubjectSubject',
            referencedTableName: 'subjects',
            referencedColumnNames: ['id'],
            columnNames: ['subject_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'FKRoutineSubjectClassGroup',
            referencedTableName: 'class_groups',
            referencedColumnNames: ['id'],
            columnNames: ['class_group_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('routine_subjects');
  }
}
