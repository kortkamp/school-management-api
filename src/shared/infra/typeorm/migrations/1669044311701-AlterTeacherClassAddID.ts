import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTeacherClassAddID1669044311701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'periodic.teacher_classes',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('periodic.teacher_classes', 'id');
  }
}
