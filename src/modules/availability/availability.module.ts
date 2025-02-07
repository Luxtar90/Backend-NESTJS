import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { Appointment } from '../../entities/appointment.entity';
import { Employee } from '../../entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Employee]), // Importa las entidades necesarias
  ],
  controllers: [AvailabilityController], // Declara el controlador
  providers: [AvailabilityService], // Declara el servicio
  exports: [AvailabilityService], // Exporta el servicio si es necesario
})
export class AvailabilityModule {}
