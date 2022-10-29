import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserAddLoginID1666973262372 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SEQUENCE user_login_id
        START WITH 10000
        INCREMENT BY 1
        MINVALUE 10000
        NO MAXVALUE`,
    );
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'number_id',
        type: 'integer',
        default: "nextval('user_login_id')",
      }),
    );
    await queryRunner.query(
      'ALTER SEQUENCE user_login_id OWNED BY users.number_id;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'number_id');
    await queryRunner.query('DROP SEQUENCE IF EXISTS  user_login_id;');
  }
}
