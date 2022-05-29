import { Segment } from '@modules/segments/infra/typeorm/models/Segment';
import { ISubject } from '@modules/subjects/models/ISubject';
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

@Entity('subjects')
class Subject implements ISubject {
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

export { Subject };
