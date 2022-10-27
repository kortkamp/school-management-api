import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTenant1665518231569 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'smsystem.tenants',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },

          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.query(
      `CREATE POLICY tenant_isolation_policy ON smsystem.tenants USING (id = current_setting('smsystem.current_tenant')::uuid);`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.tenants ENABLE ROW LEVEL SECURITY;`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.tenants FORCE ROW LEVEL SECURITY;`,
    );

    // GRANT ALL PRIVILEGES ON public.tenants to smsystem
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP POLICY tenant_isolation_policy ON smsystem.tenants;`,
    );
    await queryRunner.dropTable('smsystem.tenants');
  }
}
