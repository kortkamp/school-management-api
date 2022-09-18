import { Grade } from '@modules/grades/infra/typeorm/models/Grade';
import { ISegment } from '@modules/segments/models/ISegment';
import { Subject } from '@modules/subjects/infra/typeorm/models/Subject';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('segments')
class Segment implements ISegment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phases_number: number;

  @Column()
  phase_name: string;

  @Column()
  starting_phase: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(type => Grade, grade => grade.segment, {})
  @JoinColumn({ name: 'id' })
  grades: Grade[];

  @OneToMany(type => Subject, subject => subject.segment, {})
  @JoinColumn({ name: 'id' })
  subjects: Subject[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Segment };
