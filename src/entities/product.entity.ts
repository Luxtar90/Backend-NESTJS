import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { Store } from './store.entity';

@Entity('productos')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'descripcion', type: 'varchar', length: 255, nullable: true })
  description?: string;

  @Column({ name: 'precio', type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'stock', type: 'int', default: 0 })
  stock: number;

  @ManyToOne(() => Store, (store) => store.id)
  @JoinColumn({ name: 'id_tienda' })
  store: Store;

  @Column({
    name: 'creado_en',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
