import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    example: 1,
    description: 'ID del usuario asociado al empleado',
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'ID de la tienda asignada (opcional)',
  })
  @IsOptional()
  @IsNumber()
  storeId?: number;

  @ApiProperty({
    example: 'Licenciatura',
    description: 'Nivel de estudio (opcional)',
  })
  @IsOptional()
  @IsString()
  educationLevel?: string;

  @ApiProperty({
    example: true,
    description: 'Habilitar agenda del empleado (por defecto: true)',
  })
  @IsOptional()
  @IsBoolean()
  enableAgenda?: boolean;

  @ApiProperty({
    example: 10.5,
    description: 'Porcentaje de comisión del empleado (opcional)',
  })
  @IsOptional()
  @IsNumber()
  commissionPercentage?: number;

  @ApiProperty({
    example: { lunes: true, martes: false },
    description: 'Días disponibles para trabajar (opcional)',
  })
  @IsOptional()
  workDays?: Record<string, boolean>;
}
