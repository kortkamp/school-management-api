import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTermsAddTypeDropYear1659649124715
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('terms', [
      new TableColumn({
        name: 'type',
        type: 'enum',
        enumName: 'termTypes',
        enum: ['padrão', 'extra', 'recuperação', 'final', 'recuperação final'],
      }),
    ]);
    await queryRunner.dropColumn('terms', 'year');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('terms', [
      new TableColumn({
        name: 'year',
        type: 'varchar(255)',
      }),
    ]);

    await queryRunner.dropColumn('terms', 'type');
  }
}
