import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterRoleAddType1659293366114 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('roles', [
      new TableColumn({
        name: 'type',
        type: 'enum',
        enumName: 'roleTypes',
        enum: [
          'system-admin',
          'admin',
          'principal',
          'secretary',
          'teacher',
          'student',
          'parent',
        ],
      }),
    ]);
    await queryRunner.dropColumn('roles', 'display_name');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('roles', 'type');
    await queryRunner.addColumns('roles', [
      new TableColumn({
        name: 'display_name',
        type: 'varchar(20)',
      }),
    ]);
  }
}
