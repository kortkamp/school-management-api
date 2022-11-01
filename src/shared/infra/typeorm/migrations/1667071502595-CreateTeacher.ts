import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTeacher1667071502595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'smsystem.teachers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'person_id',
            type: 'uuid',
          },
          {
            name: 'school_id',
            type: 'uuid',
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
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
            name: 'FKTeacherPerson',
            referencedTableName: 'smsystem.persons',
            referencedColumnNames: ['id'],
            columnNames: ['person_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
          }),
          new TableForeignKey({
            name: 'FKTeacherSchool',
            referencedTableName: 'schools',
            referencedColumnNames: ['id'],
            columnNames: ['school_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'FKTeacherTenant',
            referencedTableName: 'smsystem.tenants',
            referencedColumnNames: ['id'],
            columnNames: ['tenant_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
    await queryRunner.query(
      `CREATE POLICY person_isolation_policy ON smsystem.teachers USING (tenant_id = current_setting('smsystem.current_tenant')::uuid);`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.teachers ENABLE ROW LEVEL SECURITY;`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.teachers FORCE ROW LEVEL SECURITY;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('smsystem.teachers');
  }
}
