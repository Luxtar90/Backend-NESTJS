/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from './role.entity';
import { Client } from './client.entity';
import { Employee } from './employee.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre' })
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  telefono: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'id_rol' })
  role: Role;

  @Column({
    name: 'creado_en',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creadoEn: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToOne(() => Client, (client) => client.user)
  client: Client;

  @OneToOne(() => Employee, (employee) => employee.user)
  employee: Employee;
}
