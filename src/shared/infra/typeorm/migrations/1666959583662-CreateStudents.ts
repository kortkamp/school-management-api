import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateStudents1666959583662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'smsystem.students',
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
            name: 'enroll_id',
            type: 'varchar(20)',
            isNullable: true,
          },
          {
            name: 'enroll_date',
            type: 'date',
            default: 'now()',
          },
          {
            name: 'course_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'grade_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'class_group_id',
            type: 'uuid',
            isNullable: true,
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
            name: 'FKStudentPerson',
            referencedTableName: 'smsystem.persons',
            referencedColumnNames: ['id'],
            columnNames: ['person_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
          }),
          new TableForeignKey({
            name: 'FKStudentSchool',
            referencedTableName: 'schools',
            referencedColumnNames: ['id'],
            columnNames: ['school_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'FKStudentCourse',
            referencedTableName: 'courses',
            referencedColumnNames: ['id'],
            columnNames: ['course_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'FKStudentGrade',
            referencedTableName: 'grades',
            referencedColumnNames: ['id'],
            columnNames: ['grade_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'FKStudentClassGroup',
            referencedTableName: 'class_groups',
            referencedColumnNames: ['id'],
            columnNames: ['class_group_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'FKStudentTenant',
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
      `CREATE POLICY person_isolation_policy ON smsystem.students USING (tenant_id = current_setting('smsystem.current_tenant')::uuid);`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.students ENABLE ROW LEVEL SECURITY;`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.students FORCE ROW LEVEL SECURITY;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('smsystem.students');
  }
}
