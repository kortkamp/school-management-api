import {
  ISchoolParameter,
  RecoveringType,
  ResultCalculation,
  TermPeriod,
} from '@modules/schools/models/ISchoolParameter';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { School } from './School';

@Entity('school_parameters')
class SchoolParameter implements ISchoolParameter {
  @PrimaryGeneratedColumn('uuid')
  school_id: string;

  @Column()
  passing_result: number;

  @Column()
  minimum_attendance: number;

  @OneToOne(() => School, school => school)
  @JoinColumn({ name: 'school_id', referencedColumnName: 'id' })
  school: School;

  @Column({ type: 'enum', enum: ResultCalculation })
  result_calculation: ResultCalculation;

  @Column({ type: 'enum', enum: TermPeriod })
  term_period: TermPeriod;

  @Column()
  term_number: number;

  @Column()
  recovering_coverage: number;

  @Column({ type: 'enum', enum: RecoveringType })
  recovering_type: RecoveringType;

  @Column({ type: 'enum', enum: RecoveringType })
  final_recovering: RecoveringType;

  @Column()
  class_length: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { SchoolParameter };
