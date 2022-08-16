import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterRoutinesAddRoutineGroup1660668315916
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('routines', 'day_time');
    await queryRunner.dropColumn('routines', 'school_id');
    await queryRunner.addColumns('routines', [
      new TableColumn({
        name: 'routine_group_id',
        type: 'uuid',
      }),
    ]);
    await queryRunner.createForeignKeys('routines', [
      new TableForeignKey({
        name: 'FKRoutineRoutineGroup',
        referencedTableName: 'routine_groups',
        referencedColumnNames: ['id'],
        columnNames: ['routine_group_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('routines', 'FKRoutineRoutineGroup');
    await queryRunner.dropColumn('routines', 'routine_group_id');
    await queryRunner.addColumns('routines', [
      new TableColumn({
        name: 'school_id',
        type: 'uuid',
      }),
    ]);
    await queryRunner.createForeignKeys('routines', [
      new TableForeignKey({
        name: 'FKRoutineSchool',
        referencedTableName: 'schools',
        referencedColumnNames: ['id'],
        columnNames: ['school_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
    await queryRunner.addColumns('routines', [
      new TableColumn({
        name: 'day_time',
        type: 'enum',
        enumName: 'routinesDayTime',
        enum: ['manhã', 'tarde', 'noite'],
      }),
    ]);
  }
}
