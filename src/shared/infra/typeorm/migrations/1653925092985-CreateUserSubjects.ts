import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUserSubjects1653925092985 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_subjects',
        columns: [
          {
            name: 'user_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'subject_id',
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
    await queryRunner.createForeignKeys('user_subjects', [
      new TableForeignKey({
        name: 'FKUserSubjectUser',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'FKUserSubjectSubject',
        referencedTableName: 'subjects',
        referencedColumnNames: ['id'],
        columnNames: ['subject_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_subjects');
  }
}
