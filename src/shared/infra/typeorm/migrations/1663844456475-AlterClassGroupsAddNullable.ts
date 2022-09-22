import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterClassGroupsAddNullable1663844456475
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('class_groups', 'FKClassGroupGrade');

    await queryRunner.query(
      'ALTER TABLE class_groups ALTER COLUMN grade_id DROP NOT NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE class_groups ALTER COLUMN routine_group_id DROP NOT NULL;',
    );

    await queryRunner.createForeignKey(
      'class_groups',
      new TableForeignKey({
        name: 'FKClassGroupGrade',
        referencedTableName: 'grades',
        referencedColumnNames: ['id'],
        columnNames: ['grade_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('class_groups', 'FKClassGroupGrade');

    await queryRunner.query(
      'ALTER TABLE class_groups ALTER COLUMN grade_id SET NOT NULL;',
    );
    await queryRunner.query(
      'ALTER TABLE class_groups ALTER COLUMN routine_group_id SET NOT NULL;',
    );
    await queryRunner.createForeignKey(
      'class_groups',
      new TableForeignKey({
        name: 'FKClassGroupGrade',
        referencedTableName: 'grades',
        referencedColumnNames: ['id'],
        columnNames: ['grade_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    );
  }
}
