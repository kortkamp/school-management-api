import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTeacherClassesAddSubject1655382818409
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('teacher_classes', [
      new TableColumn({
        name: 'subject_id',
        type: 'uuid',
        isPrimary: true,
      }),
    ]);
    await queryRunner.createForeignKeys('teacher_classes', [
      new TableForeignKey({
        name: 'FKTeacherClassSubject',
        referencedTableName: 'subjects',
        referencedColumnNames: ['id'],
        columnNames: ['subject_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('teacher_classes', 'subject_id');
  }
}
