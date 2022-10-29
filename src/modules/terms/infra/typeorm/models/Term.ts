import { SchoolYear } from '@modules/schoolYears/infra/typeorm/models/SchoolYear';
import { ITerm, TermType } from '@modules/terms/models/ITerm';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('periodic.terms')
class Term implements ITerm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: TermType })
  type: TermType;

  @Column()
  school_year_id: string;

  @ManyToOne(() => SchoolYear, schoolYear => schoolYear, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'school_year_id', referencedColumnName: 'id' })
  schoolYear: SchoolYear;

  @Column()
  start_at: Date;

  @Column()
  end_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Term };
