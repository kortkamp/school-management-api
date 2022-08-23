import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterRoutineAddType1660998086327 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('routines', [
      new TableColumn({
        name: 'type',
        type: 'enum',
        enumName: 'routineTypes',
        enum: ['aula', 'intervalo'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('routines', 'type');
  }
}
