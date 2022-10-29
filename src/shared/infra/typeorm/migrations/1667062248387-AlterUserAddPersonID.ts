import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterUserAddPersonID1667062248387 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'person_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);
    await queryRunner.createForeignKeys('users', [
      new TableForeignKey({
        name: 'FKUserPerson',
        referencedTableName: 'smsystem.persons',
        referencedColumnNames: ['id'],
        columnNames: ['person_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'person_id');
  }
}
