import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRolesAddNewUser1659999555603 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      // eslint-disable-next-line no-useless-concat
      `ALTER TYPE "roleTypes" ADD VALUE IF NOT EXISTS 'register'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('alter table "roles" alter type type varchar');
    await queryRunner.query('drop type "roleTypes"');
    await queryRunner.query(
      `create type "roleTypes" as enum('system-admin','admin','principal','secretary','teacher','student','parent')`,
    );
    await queryRunner.query(
      'alter table "roles" alter "type" type "roleTypes" using "type"::"roleTypes"',
    );
  }
}
