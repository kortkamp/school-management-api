import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterRoutinesAddDayTime1657123552673
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('routines', [
      new TableColumn({
        name: 'day_time',
        type: 'enum',
        enumName: 'routinesDayTime',
        enum: ['manhã', 'tarde', 'noite'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('routines', 'day_time');
  }
}
