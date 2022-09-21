import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterGradesAddCourse1663586919916 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('grades', 'segment_id');

    await queryRunner.addColumns('grades', [
      new TableColumn({
        name: 'course_id',
        type: 'uuid',
      }),
      new TableColumn({
        name: 'days',
        type: 'integer',
      }),
      new TableColumn({
        name: 'total_hours',
        type: 'integer',
      }),
    ]);
    await queryRunner.createForeignKey(
      'grades',
      new TableForeignKey({
        name: 'FKGradeCourse',
        referencedTableName: 'courses',
        referencedColumnNames: ['id'],
        columnNames: ['course_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('grades', [
      'course_id',
      'days',
      'total_hours',
    ]);

    await queryRunner.addColumn(
      'grades',
      new TableColumn({
        name: 'segment_id',
        type: 'uuid',
      }),
    );
    await queryRunner.createForeignKey(
      'grades',
      new TableForeignKey({
        name: 'FKGradeSegment',
        referencedTableName: 'segments',
        referencedColumnNames: ['id'],
        columnNames: ['segment_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    );
  }
}
