import { IGrade } from '@modules/grades/models/IGrade';
import { Segment } from '@modules/segments/infra/typeorm/models/Segment';
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

@Entity('grades')
class Grade implements IGrade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  segment_id: string;

  @ManyToOne(() => Segment, segment => segment)
  @JoinColumn({ name: 'segment_id', referencedColumnName: 'id' })
  segment: Segment;

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

export { Grade };
