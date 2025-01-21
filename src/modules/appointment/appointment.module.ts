import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsService } from './appointment.service';
import { AppointmentsController } from './appointment.controller';
import { Appointment } from '../../entities/appointment.entity';
import { Client } from '../../entities/client.entity';
import { Employee } from '../../entities/employee.entity';
import { Service } from '../../entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Client, Employee, Service])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
