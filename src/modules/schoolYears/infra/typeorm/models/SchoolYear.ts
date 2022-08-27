import { School } from '@modules/schools/infra/typeorm/models/School';
import { ISchoolYear } from '@modules/schoolYears/models/ISchoolYear';
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

@Entity('school_years')
class SchoolYear implements ISchoolYear {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  school_id: string;

  @Column()
  start_at: Date;

  @Column()
  end_at: Date;

  @Column()
  active: boolean;

  @ManyToOne(() => School, school => school)
  @JoinColumn({ name: 'school_id', referencedColumnName: 'id' })
  school: School;

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

export { SchoolYear };
