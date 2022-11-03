import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterRolesAddIsEmployee1667489617053
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('roles', [
      new TableColumn({
        name: 'is_employee',
        type: 'boolean',
        default: 'true',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('roles', 'is_employee');
  }
}
