import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ example: 1, description: 'ID del cliente' })
  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @ApiProperty({ example: 1, description: 'ID de la tienda' })
  @IsNotEmpty()
  @IsNumber()
  storeId: number;

  @ApiProperty({ example: 1, description: 'ID del servicio' })
  @IsNotEmpty()
  @IsNumber()
  serviceId: number;

  @ApiProperty({ example: '2025-01-22', description: 'Fecha de la reserva' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({ example: '14:00', description: 'Hora de la reserva' })
  @IsNotEmpty()
  @IsDateString()
  time: string;

  @ApiProperty({
    example: 'pendiente',
    description: 'Estado de la reserva',
    required: false,
  })
  @IsOptional()
  @IsEnum(['pendiente', 'confirmada', 'cancelada'])
  status?: string;
}
