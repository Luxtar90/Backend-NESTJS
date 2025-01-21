import {
  Entity,
  Column,
  PrimaryColumn, // Cambiar PrimaryGeneratedColumn por PrimaryColumn
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity('clientes') // Nombre exacto de la tabla en tu base de datos
export class Client {
  @PrimaryColumn({ name: 'id_user' }) // Define explícitamente la columna primaria
  id: number;

  @OneToOne(() => User, (user) => user.client) // Relación con la tabla de usuarios
  @JoinColumn({ name: 'id_user' }) // Une la columna id_user de esta tabla con la de User
  user: User;

  @Column({ name: 'puntos_acumulados', type: 'int', default: 0 })
  accumulatedPoints: number;

  @CreateDateColumn({ name: 'creado_en' })
  createdAt: Date;
}
