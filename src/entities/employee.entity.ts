/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    DeleteDateColumn,
    OneToOne,
  } from 'typeorm';
  import { User } from './user.entity';
  import { Store } from './store.entity';
  
  @Entity('empleados')
  export class Employee {
    @PrimaryColumn({ name: 'id_user' }) // Define id_user como clave primaria
    id: number;
  
    @OneToOne(() => User, (user) => user.employee) // Relación con la entidad User
    @JoinColumn({ name: 'id_user' }) // Une con la columna id_user en la tabla usuarios
    user: User;
  
    @ManyToOne(() => Store, (store) => store.id, { nullable: true })
    @JoinColumn({ name: 'id_tienda' })
    store?: Store;
  
    @Column({ name: 'nivel_estudio', type: 'varchar', length: 50, nullable: true })
    educationLevel?: string;
  
    @Column({ name: 'habilitar_agenda', type: 'boolean', default: true })
    enableAgenda: boolean;
  
    @Column({ name: 'comision_porcentaje', type: 'numeric', precision: 5, scale: 2, nullable: true })
    commissionPercentage?: number;
  
    @Column({ name: 'creado_en', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date;
  }
  