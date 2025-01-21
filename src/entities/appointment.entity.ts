import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Client } from './client.entity';
import { Employee } from './employee.entity';
import { Service } from './service.entity';

@Entity('citas')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.id, { eager: true })
  @JoinColumn({ name: 'id_cliente' })
  client: Client;

  @ManyToOne(() => Employee, (employee) => employee.id, { eager: true })
  @JoinColumn({ name: 'id_empleado' })
  employee: Employee;

  @ManyToOne(() => Service, (service) => service.id, { eager: true })
  @JoinColumn({ name: 'id_servicio' })
  service: Service;

  @Column({ name: 'fecha', type: 'date' })
  date: string;

  @Column({ name: 'hora', type: 'time' })
  time: string;

  @Column({ name: 'estado', type: 'varchar', length: 50, default: 'pendiente' })
  status: string;

  @Column({ name: 'turno_asignado', type: 'boolean', default: false })
  shiftAssigned: boolean;

  @Column({
    name: 'creado_en',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
