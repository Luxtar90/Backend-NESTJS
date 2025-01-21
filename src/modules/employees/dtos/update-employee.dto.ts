import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateEmployeeDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'ID de la tienda asignada (opcional)',
  })
  @IsOptional()
  @IsNumber()
  storeId?: number;

  @ApiPropertyOptional({
    example: 'Licenciatura',
    description: 'Nivel de estudio (opcional)',
  })
  @IsOptional()
  @IsString()
  educationLevel?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Habilitar agenda del empleado (opcional)',
  })
  @IsOptional()
  @IsBoolean()
  enableAgenda?: boolean;

  @ApiPropertyOptional({
    example: 15.0,
    description: 'Porcentaje de comisión del empleado (opcional)',
  })
  @IsOptional()
  @IsNumber()
  commissionPercentage?: number;

  @ApiPropertyOptional({
    example: { lunes: true, martes: true },
    description: 'Días disponibles para trabajar (opcional)',
  })
  @IsOptional()
  workDays?: Record<string, boolean>;
}
