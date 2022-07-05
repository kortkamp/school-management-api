import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoutines1657044930083 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'routines',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'school_id',
            type: 'uuid',
          },
          {
            name: 'start_at',
            type: 'time with time zone',
          },
          {
            name: 'end_at',
            type: 'time with time zone',
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
          {
            name: 'FKRoutineSchool',
            referencedTableName: 'schools',
            referencedColumnNames: ['id'],
            columnNames: ['school_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('routines', 'FKRoutineSchool');
    await queryRunner.dropTable('routines');
  }
}
