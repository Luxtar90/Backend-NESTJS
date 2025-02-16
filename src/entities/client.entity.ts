import {
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { ClientStore } from './client-store.entity';

@Entity('clientes')
export class Client {
  @PrimaryColumn({ name: 'id_user' })
  id_user: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @CreateDateColumn({ name: 'creado_en' })
  createdAt: Date;

  @OneToMany(() => ClientStore, (clientStore) => clientStore.client, {
    cascade: true,
  })
  clientStores: ClientStore[];
}
