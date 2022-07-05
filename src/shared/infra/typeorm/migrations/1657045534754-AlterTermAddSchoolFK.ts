import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterTermAddSchoolFK1657045534754 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys('terms', [
      new TableForeignKey({
        name: 'FKTermsSchool',
        referencedTableName: 'schools',
        referencedColumnNames: ['id'],
        columnNames: ['school_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('terms', 'FKTermsSchool');
  }
}
