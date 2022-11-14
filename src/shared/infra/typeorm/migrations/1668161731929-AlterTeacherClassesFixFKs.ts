import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterTeacherClassesFixFKs1668161731929
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'periodic.teacher_classes',
      'FKTeacherClassUser',
    );
    await queryRunner.createForeignKeys('periodic.teacher_classes', [
      new TableForeignKey({
        name: 'FKTeacherClassTeacher',
        referencedTableName: 'smsystem.teachers',
        referencedColumnNames: ['id'],
        columnNames: ['teacher_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'periodic.teacher_classes',
      'FKTeacherClassTeacher',
    );
    await queryRunner.createForeignKeys('periodic.teacher_classes', [
      new TableForeignKey({
        name: 'FKTeacherClassUser',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['teacher_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }
}
