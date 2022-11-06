import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterClassGroupsAddTenantID1667736872023
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'SET LOCAL smsystem.current_tenant = "376533b0-a637-4367-89a3-49fa374db6e8";',
    );
    await queryRunner.addColumns('smsystem.class_groups', [
      new TableColumn({
        name: 'course_id',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'tenant_id',
        type: 'uuid',
        default: "current_setting('smsystem.current_tenant')::uuid",
      }),
    ]);
    await queryRunner.createForeignKeys('smsystem.class_groups', [
      new TableForeignKey({
        name: 'FKClassGroupCourse',
        referencedTableName: 'smsystem.courses',
        referencedColumnNames: ['id'],
        columnNames: ['course_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
      new TableForeignKey({
        name: 'FKClassGroupTenant',
        referencedTableName: 'smsystem.tenants',
        referencedColumnNames: ['id'],
        columnNames: ['tenant_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
    await queryRunner.query(
      `CREATE POLICY class_group_isolation_policy ON smsystem.class_groups USING (tenant_id = current_setting('smsystem.current_tenant')::uuid);`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.class_groups ENABLE ROW LEVEL SECURITY;`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.class_groups FORCE ROW LEVEL SECURITY;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE smsystem.class_groups DISABLE ROW LEVEL SECURITY;`,
    );
    await queryRunner.query(
      `DROP POLICY class_group_isolation_policy ON smsystem.class_groups;`,
    );

    await queryRunner.dropColumns('smsystem.class_groups', [
      'course_id',
      'tenant_id',
    ]);
  }
}
