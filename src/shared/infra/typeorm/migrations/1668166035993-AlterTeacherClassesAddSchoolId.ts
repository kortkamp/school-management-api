import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTeacherClassesAddSchoolId1668166035993
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'periodic.teacher_classes',
      new TableColumn({
        name: 'school_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'periodic.teacher_classes',
      new TableForeignKey({
        name: 'FKTeacherClassSchool',
        referencedTableName: 'schools',
        referencedColumnNames: ['id'],
        columnNames: ['school_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('periodic.teacher_classes', 'school_id');
  }
}
