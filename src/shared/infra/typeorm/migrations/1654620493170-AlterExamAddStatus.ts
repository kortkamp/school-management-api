import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterExamAddStatus1654620493170 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'exams',
      new TableColumn({
        name: 'status',
        type: 'enum',
        enumName: 'examStatus',
        enum: ['open', 'partial', 'closed'],
        default: "'open'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('exams', 'status');
  }
}
