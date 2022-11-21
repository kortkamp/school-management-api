import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterRoutineSubjectsAddSchoolId1668614089598
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'periodic.routine_subjects',
      new TableColumn({
        name: 'school_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'periodic.routine_subjects',
      new TableForeignKey({
        name: 'FKRoutineSubjectSchool',
        referencedTableName: 'public.schools',
        referencedColumnNames: ['id'],
        columnNames: ['school_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'periodic.routine_subjects',
      'FKRoutineSubjectSchool',
    );
  }
}
