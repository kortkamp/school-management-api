import { IFilteredModule } from '@modules/filteredModules/models/IFilteredModule';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('filteredModules')
class FilteredModule implements IFilteredModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  value: number;

  @Column()
  weight: number;

  @Column()
  teacher_id: string;

  @Column()
  subject_id: string;

  @Column()
  class_id: string;

  @Column()
  date: Date;

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

export { FilteredModule };
