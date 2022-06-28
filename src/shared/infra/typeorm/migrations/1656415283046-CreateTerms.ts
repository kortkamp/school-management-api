import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTerms1656415283046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'terms',
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
            name: 'year',
            type: 'varchar(255)',
          },
          {
            name: 'school_id',
            type: 'uuid',
          },
          {
            name: 'start_at',
            type: 'timestamp with time zone',
          },
          {
            name: 'end_at',
            type: 'timestamp with time zone',
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
    await queryRunner.dropTable('terms');
  }
}
