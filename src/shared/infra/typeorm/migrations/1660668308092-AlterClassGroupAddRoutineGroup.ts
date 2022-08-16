import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterClassGroupAddRoutineGroup1660668308092
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "class_groups" DROP COLUMN "day_time"',
    );
    await queryRunner.addColumns('class_groups', [
      new TableColumn({
        name: 'routine_group_id',
        type: 'uuid',
      }),
    ]);
    await queryRunner.createForeignKeys('class_groups', [
      new TableForeignKey({
        name: 'FKClassGroupRoutineGroup',
        referencedTableName: 'routine_groups',
        referencedColumnNames: ['id'],
        columnNames: ['routine_group_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'class_groups',
      'FKClassGroupRoutineGroup',
    );
    await queryRunner.dropColumn('class_groups', 'routine_group_id');
    await queryRunner.addColumns('class_groups', [
      new TableColumn({
        name: 'day_time',
        type: 'enum',
        enumName: 'routinesDayTime',
        default: "'manhã'",
      }),
    ]);
  }
}
