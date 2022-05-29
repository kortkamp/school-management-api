import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSubjects1653841120793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'subjects',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar(255)',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('subjects');
  }
}
