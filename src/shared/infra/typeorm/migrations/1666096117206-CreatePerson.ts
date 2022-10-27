import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePerson1666096117206 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'smsystem.persons',
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
            name: 'cpf',
            type: 'varchar(11)',
            isNullable: true,
          },
          {
            name: 'rg',
            type: 'varchar(20)',
            isNullable: true,
          },
          {
            name: 'birth',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'sex',
            type: 'enum',
            enumName: 'personSexEnum',
            enum: ['M', 'F'],
          },
          {
            name: 'tenant_id',
            type: 'uuid',
            default: "current_setting('smsystem.current_tenant')::uuid",
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
      `CREATE POLICY person_isolation_policy ON smsystem.persons USING (tenant_id = current_setting('smsystem.current_tenant')::uuid);`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.persons ENABLE ROW LEVEL SECURITY;`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.persons FORCE ROW LEVEL SECURITY;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP POLICY person_isolation_policy ON smsystem.persons;`,
    );
    await queryRunner.dropTable('smsystem.persons');
  }
}
