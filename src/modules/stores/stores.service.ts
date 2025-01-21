import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../../entities/store.entity';
import { CreateStoreDto } from './dtos/create-store.dto';
import { UpdateStoreDto } from './dtos/update-store.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async findAll(): Promise<Store[]> {
    return this.storeRepository.find({ where: { deletedAt: null } });
  }

  async findOne(id: number): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!store) {
      throw new NotFoundException('Tienda no encontrada');
    }
    return store;
  }

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const store = this.storeRepository.create(createStoreDto);
    return this.storeRepository.save(store);
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    await this.storeRepository.update(id, updateStoreDto);
    return this.findOne(id);
  }

  async softDelete(id: number): Promise<void> {
    const store = await this.findOne(id);
    if (!store) {
      throw new NotFoundException('Tienda no encontrada');
    }
    await this.storeRepository.softDelete(id);
  }

  async restore(id: number): Promise<Store> {
    await this.storeRepository.restore(id);
    return this.findOne(id);
  }
}
