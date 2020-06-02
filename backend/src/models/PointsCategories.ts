import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

import Point from './Point';
import Category from './Category';

@Entity('point_categories')
class PointsCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  point_id: string;

  @ManyToMany(() => Point)
  @JoinColumn({ name: 'point_id' })
  point: Point;

  @Column()
  category_id: string;

  @ManyToMany(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Point;
};

export default PointsCategories;
