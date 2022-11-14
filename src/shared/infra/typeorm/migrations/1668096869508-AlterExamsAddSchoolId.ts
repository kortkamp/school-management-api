import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterExamsAddSchoolId1668096869508 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'periodic.exams',
      new TableColumn({
        name: 'school_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'periodic.exams',
      new TableForeignKey({
        name: 'FKUserSchool',
        referencedTableName: 'schools',
        referencedColumnNames: ['id'],
        columnNames: ['school_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('periodic.exams', 'school_id');
  }
}
