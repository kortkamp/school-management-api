import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserAddColumns1654648822359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'enroll_id',
        type: 'varchar',
        isUnique: true,
        isNullable: true,
      }),
      new TableColumn({
        name: 'CPF',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'sex',
        type: 'enum',
        enumName: 'sexTypes',
        enum: ['M', 'F'],
      }),
      new TableColumn({
        name: 'birth',
        type: 'varchar',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      'enroll_id',
      'CPF',
      'phone',
      'sex',
      'birth',
    ]);
  }
}
