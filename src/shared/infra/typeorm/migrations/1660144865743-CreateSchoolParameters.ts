import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSchoolParameters1660144865743 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'school_parameters',

        columns: [
          {
            name: 'school_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'passing_result',
            type: 'NUMERIC(7,2)',
          },
          {
            name: 'minimum_attendance',
            type: 'NUMERIC(5,2)',
          },
          {
            name: 'result_calculation',
            type: 'enum',
            enumName: 'resultCalculation',
            enum: ['somatório', 'média'],
          },
          {
            name: 'term_period',
            type: 'enum',
            enumName: 'termPeriods',
            enum: ['bimestre', 'trimestre', 'quadrimestre', 'semestre', 'ano'],
          },
          { name: 'term_number', type: 'integer' },
          {
            name: 'recovering_coverage',
            type: 'integer',
          },
          {
            name: 'recovering_type',
            type: 'enum',
            enumName: 'RecoveringType',
            enum: ['soma', 'média', 'substitutiva', 'maior nota'],
          },
          {
            name: 'final_recovering',
            type: 'enum',
            enumName: 'RecoveringType',
            isNullable: true,
          },
          {
            name: 'class_length',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'FKSchoolParametersSchool',
            referencedTableName: 'schools',
            referencedColumnNames: ['id'],
            columnNames: ['school_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('school_parameters');
    await queryRunner.query('drop type "resultCalculation"');
    await queryRunner.query('drop type "termPeriods"');
    await queryRunner.query('drop type "RecoveringPeriod"');
    await queryRunner.query('drop type "RecoveringType"');
  }
}
