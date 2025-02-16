import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { Client } from './client.entity';
import { Store } from './store.entity';
import { Service } from './service.entity';

@Entity('reservas')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.id_user)
  @JoinColumn({ name: 'id_cliente' })
  client: Client;

  @ManyToOne(() => Store, (store) => store.id)
  @JoinColumn({ name: 'id_tienda' })
  store: Store;

  @ManyToOne(() => Service, (service) => service.id)
  @JoinColumn({ name: 'id_servicio' })
  service: Service;

  @Column({ name: 'fecha', type: 'date' })
  date: string;

  @Column({ name: 'hora', type: 'time' })
  time: string;

  @Column({ name: 'estado', type: 'varchar', length: 50, default: 'pendiente' })
  status: string;

  @Column({
    name: 'creado_en',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
