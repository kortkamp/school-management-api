import { IRoutine } from '@modules/routines/models/IRoutine';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('routines')
class Routine implements IRoutine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  school_id: string;

  @Column()
  start_at: string;

  @Column()
  end_at: string;

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

export { Routine };
