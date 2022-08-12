import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterSchoolAddAddressFields1660263739653
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('schools', 'address_id');
    await queryRunner.addColumns('schools', [
      new TableColumn({
        name: 'street',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'number',
        type: 'varchar(20)',
        isNullable: true,
      }),
      new TableColumn({
        name: 'complement',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'district',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'city',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'state',
        type: 'varchar(2)',
        isNullable: true,
      }),
      new TableColumn({
        name: 'CEP',
        type: 'varchar(8)',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('schools', [
      'street',
      'number',
      'complement',
      'district',
      'city',
      'state',
      'CEP',
    ]);
    await queryRunner.addColumns('schools', [
      new TableColumn({
        name: 'address_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);
    await queryRunner.createForeignKeys('schools', [
      new TableForeignKey({
        name: 'FKSchoolAddress',
        referencedTableName: 'addresses',
        referencedColumnNames: ['id'],
        columnNames: ['address_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }
}
