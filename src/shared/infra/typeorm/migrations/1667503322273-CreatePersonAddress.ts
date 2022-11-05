import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePersonAddress1667503322273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'smsystem.person_addresses',
        columns: [
          {
            name: 'person_id',
            type: 'uuid',
          },
          {
            name: 'address_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'FKPersonAddressPerson',
            referencedTableName: 'smsystem.persons',
            referencedColumnNames: ['id'],
            columnNames: ['person_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'FKPersonAddressAddress',
            referencedTableName: 'smsystem.addresses',
            referencedColumnNames: ['id'],
            columnNames: ['address_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('smsystem.person_addresses');
  }
}
