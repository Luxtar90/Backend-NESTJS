import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ClientStore } from './client-store.entity';

@Entity('tiendas')
export class Store {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'direccion', type: 'varchar', length: 255, nullable: true })
  address?: string;

  @Column({
    name: 'numero_celular',
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  phone?: string;

  @Column({ name: 'email', type: 'varchar', length: 100, nullable: true })
  email?: string;

  @Column({ name: 'codigo_unico', type: 'varchar', length: 50, unique: true })
  uniqueCode: string;

  @Column({ name: 'imagen', nullable: true })
  imagen: string;

  @Column({
    name: 'creado_en',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.id) // Relación con el administrador
  @JoinColumn({ name: 'id_admin' })
  admin: User;

  @OneToMany(() => ClientStore, (clientStore) => clientStore.store, { cascade: true })
  clientStores: ClientStore[];
}
