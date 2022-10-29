import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterUserNormalizeTable1666968923398
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      'segment_id',
      'grade_id',
      'class_group_id',
      'enroll_id',
      'CPF',
      'phone',
      'sex',
      'birth',
      'address_id',
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'address_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);
    await queryRunner.createForeignKeys('users', [
      new TableForeignKey({
        name: 'FKUserAddress',
        referencedTableName: 'addresses',
        referencedColumnNames: ['id'],
        columnNames: ['address_id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'enroll_id',
        type: 'varchar',
        isUnique: true,
        isNullable: true,
      }),
      new TableColumn({
        name: 'CPF',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'sex',
        type: 'enum',
        enumName: 'sexTypes',
        enum: ['M', 'F'],
      }),
      new TableColumn({
        name: 'birth',
        type: 'timestamp with time zone',
      }),
    ]);
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'segment_id',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'grade_id',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'class_group_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);
    await queryRunner.createForeignKeys('users', [
      new TableForeignKey({
        name: 'FKUserSegment',
        referencedTableName: 'segments',
        referencedColumnNames: ['id'],
        columnNames: ['segment_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
      new TableForeignKey({
        name: 'FKUserGrade',
        referencedTableName: 'grades',
        referencedColumnNames: ['id'],
        columnNames: ['grade_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
      new TableForeignKey({
        name: 'FKUserClassGroup',
        referencedTableName: 'class_groups',
        referencedColumnNames: ['id'],
        columnNames: ['class_group_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    ]);
  }
}
