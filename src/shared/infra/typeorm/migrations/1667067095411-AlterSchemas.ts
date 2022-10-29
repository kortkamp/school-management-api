import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterSchemas1667067095411 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // schema periodic
    await queryRunner.query(
      `ALTER TABLE terms
        SET SCHEMA periodic;`,
    );
    await queryRunner.query(
      `ALTER TABLE school_years
        SET SCHEMA periodic;`,
    );
    await queryRunner.query(
      `ALTER TABLE exam_results
        SET SCHEMA periodic;`,
    );
    await queryRunner.query(
      `ALTER TABLE exams
        SET SCHEMA periodic;`,
    );
    await queryRunner.query(
      `ALTER TABLE teacher_classes
        SET SCHEMA periodic;`,
    );
    await queryRunner.query(
      `ALTER TABLE user_subjects
        SET SCHEMA periodic;`,
    );

    // schema smsystem
    await queryRunner.query(
      `ALTER TABLE addresses
        SET SCHEMA smsystem;`,
    );
    await queryRunner.query(
      `ALTER TABLE class_groups
        SET SCHEMA smsystem;`,
    );
    await queryRunner.query(
      `ALTER TABLE courses
        SET SCHEMA smsystem;`,
    );
    await queryRunner.query(
      `ALTER TABLE grades
        SET SCHEMA smsystem;`,
    );
    await queryRunner.query(
      `ALTER TABLE routines
        SET SCHEMA smsystem;`,
    );
    await queryRunner.query(
      `ALTER TABLE routine_groups
        SET SCHEMA smsystem;`,
    );
    await queryRunner.query(
      `ALTER TABLE routine_subjects
        SET SCHEMA smsystem;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // schema periodic
    await queryRunner.query(
      `ALTER TABLE periodic.terms
          SET SCHEMA public;`,
    );
    await queryRunner.query(
      `ALTER TABLE periodic.school_years
          SET SCHEMA public;`,
    );
    await queryRunner.query(
      `ALTER TABLE periodic.exam_results
          SET SCHEMA public;`,
    );
    await queryRunner.query(
      `ALTER TABLE periodic.exams
          SET SCHEMA public;`,
    );
    await queryRunner.query(
      `ALTER TABLE periodic.teacher_classes
          SET SCHEMA public;`,
    );
    await queryRunner.query(
      `ALTER TABLE periodic.user_subjects
          SET SCHEMA public;`,
    );

    // schema smsystem
    await queryRunner.query(
      `ALTER TABLE smsystem.addresses
          SET SCHEMA public;`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.class_groups
          SET SCHEMA public;`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.courses
          SET SCHEMA public;`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.grades
          SET SCHEMA public;`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.routines
          SET SCHEMA public;`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.routine_groups
          SET SCHEMA public;`,
    );
    await queryRunner.query(
      `ALTER TABLE smsystem.routine_subjects
          SET SCHEMA public;`,
    );
  }
}
