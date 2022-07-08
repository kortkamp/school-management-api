import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterClassGroupAddDayTime1657198042225
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('class_groups', [
      new TableColumn({
        name: 'day_time',
        type: 'enum',
        enumName: 'routinesDayTime',
        default: "'manhã'",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('class_groups', 'day_time');
  }
}
