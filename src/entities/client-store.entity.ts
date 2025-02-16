import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Client } from './client.entity';
import { Store } from './store.entity';

@Entity('cliente_tiendas')
export class ClientStore {
  @PrimaryColumn({ name: 'id_cliente' })
  idCliente: number;

  @PrimaryColumn({ name: 'id_tienda' })
  idTienda: number;

  @Column({ name: 'puntos_acumulados', default: 0 })
  puntosAcumulados: number;

  @Column({ name: 'fecha_registro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro: Date;

  @Column({ name: 'ultima_visita', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  ultimaVisita: Date;

  @Column({ name: 'estado', default: true })
  estado: boolean;

  @ManyToOne(() => Client, client => client.clientStores)
  @JoinColumn({ name: 'id_cliente' })
  client: Client;

  @ManyToOne(() => Store, store => store.clientStores)
  @JoinColumn({ name: 'id_tienda' })
  store: Store;
}
