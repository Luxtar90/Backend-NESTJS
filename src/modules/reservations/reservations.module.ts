import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../../entities/reservation.entity';
import { Client } from '../../entities/client.entity';
import { Store } from '../../entities/store.entity';
import { Service } from '../../entities/service.entity';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Client, Store, Service])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
