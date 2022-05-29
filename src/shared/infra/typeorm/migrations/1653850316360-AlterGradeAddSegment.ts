import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterGradeAddSegment1653850316360 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'grades',
      new TableColumn({
        name: 'segment_id',
        type: 'uuid',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      'grades',
      new TableForeignKey({
        name: 'FKGradeSegment',
        referencedTableName: 'roles',
        referencedColumnNames: ['id'],
        columnNames: ['segment_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('grades', 'FKGradeSegment');
    await queryRunner.dropColumn('grades', 'segment_id');
  }
}
