import { Person } from '@modules/persons/infra/typeorm/models/Person';
import { School } from '@modules/schools/infra/typeorm/models/School';
import { ITeacher } from '@modules/teachers/models/ITeacher';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('smsystem.teachers')
class Teacher implements ITeacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  person_id: string;

  @ManyToOne(() => Person, person => person, { cascade: ['insert'] })
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: Person;

  @Column('uuid')
  school_id: string;

  @ManyToOne(() => School, school => school)
  @JoinColumn({ name: 'school_id', referencedColumnName: 'id' })
  school: School;

  @Column('boolean')
  active: boolean;

  @Column()
  tenant_id: string;

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

export { Teacher };
