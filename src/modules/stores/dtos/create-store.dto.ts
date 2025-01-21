import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({ example: 'Tienda XYZ', description: 'Nombre de la tienda' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '123 Calle Principal',
    description: 'Dirección de la tienda',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: '+123456789',
    description: 'Número de teléfono de la tienda',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: 'tienda@example.com',
    description: 'Correo electrónico de la tienda',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: '12345', description: 'Código único de la tienda' })
  @IsNotEmpty()
  @IsString()
  uniqueCode: string;

  @ApiProperty({
    example: 1,
    description: 'ID del administrador propietario de la tienda',
  })
  @IsNotEmpty()
  adminId: number;
}
