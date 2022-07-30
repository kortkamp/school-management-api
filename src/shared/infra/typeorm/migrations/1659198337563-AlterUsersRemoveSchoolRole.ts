import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUsersRemoveSchoolRole1659198337563
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', ['school_id', 'role_id']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'school_id',
        type: 'uuid',
      }),
      new TableColumn({
        name: 'role_id',
        type: 'uuid',
      }),
    ]);
  }
}
