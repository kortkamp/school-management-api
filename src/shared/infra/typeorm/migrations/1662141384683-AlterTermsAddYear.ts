import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterTermsAddYear1662141384683 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE terms RENAME COLUMN school_id TO school_year_id;`,
    );
    await queryRunner.dropForeignKey('terms', 'FKTermsSchool');
    await queryRunner.createForeignKeys('terms', [
      new TableForeignKey({
        name: 'FKTermsSchoolYear',
        referencedTableName: 'school_years',
        referencedColumnNames: ['id'],
        columnNames: ['school_year_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE terms RENAME COLUMN school_year_id TO school_id;`,
    );
    await queryRunner.dropForeignKey('terms', 'FKTermsSchoolYear');
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
}
