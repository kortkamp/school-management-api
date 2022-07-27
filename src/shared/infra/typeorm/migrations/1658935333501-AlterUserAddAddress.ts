import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterUserAddAddress1658935333501 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'address_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);
    await queryRunner.createForeignKeys('users', [
      new TableForeignKey({
        name: 'FKUserAddress',
        referencedTableName: 'addresses',
        referencedColumnNames: ['id'],
        columnNames: ['address_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'FKUserAddress');
    await queryRunner.dropColumn('users', 'address_id');
  }
}
