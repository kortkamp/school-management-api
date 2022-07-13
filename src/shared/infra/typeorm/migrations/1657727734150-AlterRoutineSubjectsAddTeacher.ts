import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterRoutineSubjectsAddTeacher1657727734150
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('routine_subjects', [
      new TableColumn({
        name: 'teacher_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);
    await queryRunner.createForeignKeys('routine_subjects', [
      new TableForeignKey({
        name: 'FKRoutineSubjectsTeacher',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['teacher_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('routine_subjects', 'teacher_id');
  }
}
