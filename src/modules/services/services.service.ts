import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../../entities/service.entity';
import { CreateServiceDto } from './dtos/create-service.dto';
import { UpdateServiceDto } from './dtos/update-service.dto';
import { Store } from '../../entities/store.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find({
      where: { deletedAt: null },
      relations: ['store'],
    });
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOne({
      where: { id, deletedAt: null },
      relations: ['store'],
    });
    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }
    return service;
  }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const store = await this.storeRepository.findOne({
      where: { id: createServiceDto.storeId },
    });
    if (!store) {
      throw new NotFoundException('La tienda asociada no existe');
    }

    const service = this.serviceRepository.create({
      ...createServiceDto,
      store,
    });
    return this.serviceRepository.save(service);
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const service = await this.findOne(id);

    if (updateServiceDto.storeId) {
      const store = await this.storeRepository.findOne({
        where: { id: updateServiceDto.storeId },
      });
      if (!store) {
        throw new NotFoundException('La tienda asociada no existe');
      }
      service.store = store;
    }

    Object.assign(service, updateServiceDto);
    return this.serviceRepository.save(service);
  }

  async softDelete(id: number): Promise<void> {
    const service = await this.findOne(id);
    await this.serviceRepository.softDelete(service.id);
  }

  async restore(id: number): Promise<Service> {
    await this.serviceRepository.restore(id);
    return this.findOne(id);
  }
}
