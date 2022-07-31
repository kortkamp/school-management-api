import { Role } from '@modules/roles/infra/typeorm/models/Role';
import { School } from '@modules/schools/infra/typeorm/models/School';
import { User } from '@modules/users/infra/typeorm/models/User';
import { IUserSchoolRole } from '@modules/users/models/IUserSchoolRole';
import {
  Entity,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('user_school_roles')
class UserSchoolRole implements IUserSchoolRole {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  school_id: string;

  @PrimaryColumn()
  role_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => School)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @OneToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn()
  created_at: Date;
}

export { UserSchoolRole };
