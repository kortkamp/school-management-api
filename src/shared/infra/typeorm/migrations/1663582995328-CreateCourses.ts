import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCourses1663582995328 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'courses',
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
            name: 'name',
            type: 'varchar',
          },

          {
            name: 'segment_id',
            type: 'uuid',
          },

          {
            name: 'total_hours',
            type: 'integer',
          },

          {
            name: 'phase_name',
            type: 'varchar(100)',
          },

          {
            name: 'phases_number',
            type: 'integer',
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
            name: 'FKCoursesSchool',
            referencedTableName: 'schools',
            referencedColumnNames: ['id'],
            columnNames: ['school_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('courses');
  }
}
