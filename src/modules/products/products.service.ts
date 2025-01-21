import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Store } from '../../entities/store.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      where: { deletedAt: null },
      relations: ['store'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id, deletedAt: null },
      relations: ['store'],
    });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const store = await this.storeRepository.findOne({
      where: { id: createProductDto.storeId },
    });
    if (!store) {
      throw new NotFoundException('La tienda asociada no existe');
    }

    const product = this.productRepository.create({
      ...createProductDto,
      store,
    });
    return this.productRepository.save(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    if (updateProductDto.storeId) {
      const store = await this.storeRepository.findOne({
        where: { id: updateProductDto.storeId },
      });
      if (!store) {
        throw new NotFoundException('La tienda asociada no existe');
      }
      product.store = store;
    }

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async softDelete(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.softDelete(product.id);
  }

  async restore(id: number): Promise<Product> {
    await this.productRepository.restore(id);
    return this.findOne(id);
  }
}
