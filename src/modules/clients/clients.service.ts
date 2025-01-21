import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../entities/client.entity';
import { CreateClientDto } from './dtos/create-client.dto';
import { UpdateClientDto } from './dtos/update-client.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }
    return client;
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const user = await this.userRepository.findOne({
      where: { id: createClientDto.userId },
    });
    if (!user) {
      throw new NotFoundException('Usuario asociado no encontrado');
    }

    const client = this.clientRepository.create({ user });
    return this.clientRepository.save(client);
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);

    if (updateClientDto.userId) {
      const user = await this.userRepository.findOne({
        where: { id: updateClientDto.userId },
      });
      if (!user) {
        throw new NotFoundException('Usuario asociado no encontrado');
      }
      client.user = user;
    }

    return this.clientRepository.save(client);
  }

  async delete(id: number): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepository.delete(client.id);
  }
}
