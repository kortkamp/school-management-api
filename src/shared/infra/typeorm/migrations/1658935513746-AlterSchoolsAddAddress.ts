import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterSchoolsAddAddress1658935513746 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('schools', 'FKSchoolAddress');
    await queryRunner.dropColumn('schools', 'address_id');
  }
}
