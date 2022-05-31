import { IClassGroup } from '@modules/classGroups/models/IClassGroup';
import { Grade } from '@modules/grades/infra/typeorm/models/Grade';
import { User } from '@modules/users/infra/typeorm/models/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('class_groups')
class ClassGroup implements IClassGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grade_id: string;

  @Column()
  school_id: string;

  @OneToMany(type => User, users => users.classGroup, {})
  @JoinColumn({ name: 'id' })
  users: User[];

  @ManyToOne(() => Grade, grade => grade)
  @JoinColumn({ name: 'grade_id', referencedColumnName: 'id' })
  grade: Grade;

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

export { ClassGroup };
