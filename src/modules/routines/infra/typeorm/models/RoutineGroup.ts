import { IRoutineGroup } from '@modules/routines/models/IRoutineGroup';
import { School } from '@modules/schools/infra/typeorm/models/School';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('routineGroups')
class RoutineGroup implements IRoutineGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  school_id: string;

  @ManyToOne(() => School, school => school)
  @JoinColumn({ name: 'school_id', referencedColumnName: 'id' })
  school: School;

  // @OneToMany(type => UserSchoolRole, userSchoolRole => userSchoolRole.school, {
  //   cascade: ['insert'],
  // })
  // @JoinColumn({ name: 'id' })
  // userSchoolRoles: UserSchoolRole[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { RoutineGroup };
