import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterExamsAddTerm1656500252606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'exams',
      new TableColumn({
        name: 'term_id',
        type: 'uuid',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('exams', 'term_id');
  }
}
