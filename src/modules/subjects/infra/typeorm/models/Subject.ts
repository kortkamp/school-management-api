import { Segment } from '@modules/segments/infra/typeorm/models/Segment';
import { ISubject } from '@modules/subjects/models/ISubject';
import { User } from '@modules/users/infra/typeorm/models/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
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

  // @ManyToMany(type => User, user => user.subjects)
  // users: User[];

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
