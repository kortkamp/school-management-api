import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTeacherClasses1654347855708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'teacher_classes',
        columns: [
          {
            name: 'teacher_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'class_group_id',
            type: 'uuid',
            isPrimary: true,
          },

          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('teacher_classes', [
      new TableForeignKey({
        name: 'FKTeacherClassUser',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['teacher_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FKTeacherClassClass',
        referencedTableName: 'class_groups',
        referencedColumnNames: ['id'],
        columnNames: ['class_group_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('teacher_classes', 'FKTeacherClassClass');
    await queryRunner.dropForeignKey('teacher_classes', 'FKTeacherClassUser');
    await queryRunner.dropTable('teacher_classes');
  }
}
