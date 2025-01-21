import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: 4, description: 'ID del cliente asociado' })
  @IsNotEmpty()
  clientId: number;

  @ApiProperty({ example: 3, description: 'ID del empleado asignado' })
  @IsNotEmpty()
  employeeId: number;

  @ApiProperty({ example: 1, description: 'ID del servicio asociado' })
  @IsNotEmpty()
  serviceId: number;

  @ApiProperty({ example: '2025-01-22', description: 'Fecha de la cita' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({ example: '14:00', description: 'Hora de la cita' })
  @IsNotEmpty()
  @IsDateString()
  time: string;

  @ApiProperty({
    example: 'pendiente',
    description: 'Estado de la cita (pendiente, confirmada, cancelada)',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    example: false,
    description: 'Indica si el turno fue asignado manualmente',
  })
  @IsOptional()
  @IsBoolean()
  shiftAssigned?: boolean;
}
