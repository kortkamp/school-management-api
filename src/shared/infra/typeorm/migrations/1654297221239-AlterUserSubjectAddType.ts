import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserSubjectAddType1654297221239
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_subjects',
      new TableColumn({
        name: 'type',
        type: 'enum',
        enumName: 'userSubjectTypes',
        enum: ['teacher', 'student'],
        default: "'student'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_subjects', 'type');
  }
}
