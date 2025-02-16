import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../../entities/reservation.entity';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { Client } from '../../entities/client.entity';
import { Store } from '../../entities/store.entity';
import { Service } from '../../entities/service.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { deletedAt: null },
      relations: ['client', 'store', 'service'],
    });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id, deletedAt: null },
      relations: ['client', 'store', 'service'],
    });
    if (!reservation) {
      throw new NotFoundException('Reserva no encontrada');
    }
    return reservation;
  }

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const client = await this.clientRepository.findOne({
      where: { id_user: createReservationDto.clientId },
    });
    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const store = await this.storeRepository.findOne({
      where: { id: createReservationDto.storeId },
    });
    if (!store) {
      throw new NotFoundException('Tienda no encontrada');
    }

    const service = await this.serviceRepository.findOne({
      where: { id: createReservationDto.serviceId },
    });
    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }

    const reservation = this.reservationRepository.create({
      ...createReservationDto,
      client,
      store,
      service,
    });

    return this.reservationRepository.save(reservation);
  }

  async update(
    id: number,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const reservation = await this.findOne(id);

    Object.assign(reservation, updateReservationDto);
    return this.reservationRepository.save(reservation);
  }

  async softDelete(id: number): Promise<void> {
    const reservation = await this.findOne(id);
    await this.reservationRepository.softDelete(reservation.id);
  }

  async restore(id: number): Promise<Reservation> {
    await this.reservationRepository.restore(id);
    return this.findOne(id);
  }
}
