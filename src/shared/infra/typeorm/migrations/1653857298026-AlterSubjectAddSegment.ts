import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterSubjectAddSegment1653857298026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'subjects',
      new TableColumn({
        name: 'segment_id',
        type: 'uuid',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      'subjects',
      new TableForeignKey({
        name: 'FKSubjectSegment',
        referencedTableName: 'segments',
        referencedColumnNames: ['id'],
        columnNames: ['segment_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('subjects', 'FKSubjectSegment');
    await queryRunner.dropColumn('subjects', 'segment_id');
  }
}
