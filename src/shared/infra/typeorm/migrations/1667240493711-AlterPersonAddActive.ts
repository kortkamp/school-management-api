import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterPersonAddActive1667240493711 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('smsystem.persons', [
      new TableColumn({
        name: 'active',
        type: 'boolean',
        default: 'false',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('smsystem.persons', 'active');
  }
}
