import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateContacts1667867320438 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'smsystem.contacts',
        columns: [
          {
            isPrimary: true,
            name: 'person_id',
            type: 'uuid',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'cel_phone',
            type: 'varchar',
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
        foreignKeys: [
          new TableForeignKey({
            name: 'FKContactPerson',
            referencedTableName: 'smsystem.persons',
            referencedColumnNames: ['id'],
            columnNames: ['person_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
    await queryRunner.query(
      `CREATE POLICY contact_isolation_policy ON smsystem.contacts USING (tenant_id = current_setting('smsystem.current_tenant')::uuid);`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.contacts ENABLE ROW LEVEL SECURITY;`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.contacts FORCE ROW LEVEL SECURITY;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP POLICY contact_isolation_policy ON smsystem.contacts;`,
    );
    await queryRunner.dropTable('smsystem.contacts');
  }
}
