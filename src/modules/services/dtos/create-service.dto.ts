import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    example: 'Corte de Cabello',
    description: 'Nombre del servicio',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Corte de cabello para hombres',
    description: 'Descripción del servicio',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 15.0, description: 'Precio del servicio' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 30, description: 'Duración del servicio en minutos' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  duration: number;

  @ApiProperty({
    example: true,
    description: 'Si el servicio es destacado',
    required: false,
  })
  @IsOptional()
  isFeatured?: boolean;

  @ApiProperty({ example: 1, description: 'ID de la tienda asociada' })
  @IsNotEmpty()
  @IsNumber()
  storeId: number;
}
