import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterRoleAddDisplayName1659201634747
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('roles', [
      new TableColumn({
        name: 'display_name',
        type: 'varchar(20)',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('roles', 'display_name');
  }
}
