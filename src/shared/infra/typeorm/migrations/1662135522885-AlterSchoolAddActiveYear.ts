import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('schools', 'active_year_id');
  }
}
