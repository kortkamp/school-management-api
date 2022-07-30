import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterSchoolsAddPhoneCNPJ1659026177564
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('schools', [
      new TableColumn({
        name: 'CNPJ',
        type: 'varchar(14)',
        isNullable: true,
      }),
      new TableColumn({
        name: 'phone',
        type: 'varchar(10)',
        isNullable: true,
      }),
      new TableColumn({
        name: 'mobile',
        type: 'varchar(11)',
        isNullable: true,
      }),
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isNullable: true,
      }),

      new TableColumn({
        name: 'full_name',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('schools', [
      'CNPJ',
      'phone',
      'mobile',
      'email',
      'full_name',
    ]);
  }
}
