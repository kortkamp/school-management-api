import { Grade } from '@modules/grades/infra/typeorm/models/Grade';
import { ISegment } from '@modules/segments/models/ISegment';
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(type => Grade, grade => grade.segment, {})
  @JoinColumn({ name: 'id' })
  grades: Grade[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Segment };
