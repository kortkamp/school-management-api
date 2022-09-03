import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterSchoolAddActiveYear1662135522885
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('schools', [
      new TableColumn({
        name: 'active_year_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);
    await queryRunner.createForeignKeys('schools', [
      new TableForeignKey({
        name: 'FKSchoolActiveYear',
        referencedTableName: 'school_years',
        referencedColumnNames: ['id'],
        columnNames: ['active_year_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('schools', 'active_year_id');
  }
}
