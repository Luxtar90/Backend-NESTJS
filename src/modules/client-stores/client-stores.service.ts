import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientStore } from '../../entities/client-store.entity';

@Injectable()
export class ClientStoresService {
  constructor(
    @InjectRepository(ClientStore)
    private clientStoreRepository: Repository<ClientStore>,
  ) {}

  async findAllByClientId(idCliente: number): Promise<ClientStore[]> {
    return this.clientStoreRepository.find({
      where: { idCliente, estado: true },
      relations: ['store'],
    });
  }

  async findAllByStoreId(idTienda: number): Promise<ClientStore[]> {
    return this.clientStoreRepository.find({
      where: { idTienda, estado: true },
      relations: ['client'],
    });
  }

  async findOne(idCliente: number, idTienda: number): Promise<ClientStore> {
    const clientStore = await this.clientStoreRepository.findOne({
      where: { idCliente, idTienda },
      relations: ['store', 'client'],
    });

    if (!clientStore) {
      throw new NotFoundException('Relación cliente-tienda no encontrada');
    }

    return clientStore;
  }

  async create(clientStore: Partial<ClientStore>): Promise<ClientStore> {
    const newClientStore = this.clientStoreRepository.create({
      ...clientStore,
      fechaRegistro: new Date(),
      ultimaVisita: new Date(),
      estado: true,
      puntosAcumulados: 0,
    });

    return this.clientStoreRepository.save(newClientStore);
  }

  async updatePoints(
    idCliente: number,
    idTienda: number,
    puntos: number,
  ): Promise<ClientStore> {
    const clientStore = await this.findOne(idCliente, idTienda);

    clientStore.puntosAcumulados = puntos;
    clientStore.ultimaVisita = new Date();
    return this.clientStoreRepository.save(clientStore);
  }

  async deactivate(idCliente: number, idTienda: number): Promise<void> {
    const clientStore = await this.findOne(idCliente, idTienda);
    clientStore.estado = false;
    await this.clientStoreRepository.save(clientStore);
  }

  async restore(idCliente: number, idTienda: number): Promise<ClientStore> {
    const clientStore = await this.clientStoreRepository.findOne({
      where: { idCliente, idTienda },
      relations: ['store', 'client'],
    });

    if (!clientStore) {
      throw new NotFoundException('Relación cliente-tienda no encontrada');
    }

    clientStore.estado = true;
    clientStore.ultimaVisita = new Date();
    return this.clientStoreRepository.save(clientStore);
  }
}
