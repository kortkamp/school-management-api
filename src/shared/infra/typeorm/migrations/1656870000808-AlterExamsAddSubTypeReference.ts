import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterExamsAddSubTypeReference1656870000808
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('exams', [
      new TableColumn({
        name: 'sub_type',
        type: 'enum',
        enumName: 'examSubTypes',
        enum: ['accumulative', 'substitutive', 'greater', 'mean'],
        default: "'accumulative'",
      }),
      new TableColumn({
        name: 'reference_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);
    await queryRunner.createForeignKeys('exams', [
      new TableForeignKey({
        name: 'FKExamReference',
        referencedTableName: 'exams',
        referencedColumnNames: ['id'],
        columnNames: ['reference_id'],
        onDelete: '',
        onUpdate: '',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('exams', 'FKExamReference');
    await queryRunner.dropColumns('exams', ['sub_type', 'reference_id']);
  }
}
