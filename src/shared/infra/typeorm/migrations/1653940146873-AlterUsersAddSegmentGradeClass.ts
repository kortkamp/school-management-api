import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterUsersAddSegmentGradeClass1653940146873
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'segment_id',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'grade_id',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'class_group_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);
    await queryRunner.createForeignKeys('users', [
      new TableForeignKey({
        name: 'FKUserSegment',
        referencedTableName: 'segments',
        referencedColumnNames: ['id'],
        columnNames: ['segment_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
      new TableForeignKey({
        name: 'FKUserGrade',
        referencedTableName: 'grades',
        referencedColumnNames: ['id'],
        columnNames: ['grade_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
      new TableForeignKey({
        name: 'FKUserClassGroup',
        referencedTableName: 'class_groups',
        referencedColumnNames: ['id'],
        columnNames: ['class_group_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'FKUserClassGroup');
    await queryRunner.dropForeignKey('users', 'FKUserGrade');
    await queryRunner.dropForeignKey('users', 'FKUserSegment');

    await queryRunner.dropColumn('users', 'class_group_id');
    await queryRunner.dropColumn('users', 'grade_id');
    await queryRunner.dropColumn('users', 'segment_id');
  }
}
