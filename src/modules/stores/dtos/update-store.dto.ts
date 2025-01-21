import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStoreDto {
  @ApiProperty({
    example: 'Tienda Actualizada',
    description: 'Nombre de la tienda',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: '456 Calle Secundaria',
    description: 'Dirección de la tienda',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: '+987654321',
    description: 'Número de teléfono de la tienda',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: 'actualizado@example.com',
    description: 'Correo electrónico de la tienda',
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: '67890',
    description: 'Código único de la tienda',
    required: false,
  })
  @IsOptional()
  @IsString()
  uniqueCode?: string;
}
