import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../entities/client.entity';
import { CreateClientDto } from './dtos/create-client.dto';
import { UpdateClientDto } from './dtos/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find({
      relations: ['user', 'clientStores']
    });
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id_user: id },
      relations: ['user', 'clientStores'],
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = new Client();
    client.id_user = createClientDto.id_user;

    try {
      return await this.clientRepository.save(client);
    } catch (error) {
      throw new Error('Error creating client: ' + error.message);
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    
    Object.assign(client, updateClientDto);
    
    try {
      return await this.clientRepository.save(client);
    } catch (error) {
      throw new Error('Error updating client: ' + error.message);
    }
  }

  async remove(id: number): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepository.delete(client.id_user);
  }
}
