import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterSegmentsAddPhases1663255787005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('segments', [
      new TableColumn({
        name: 'phases_number',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'phase_name',
        type: 'varchar(100)',
        isNullable: true,
      }),
      new TableColumn({
        name: 'starting_phase',
        type: 'integer',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('segments', [
      'phases_number',
      'phase_name',
      'starting_phase',
    ]);
  }
}
