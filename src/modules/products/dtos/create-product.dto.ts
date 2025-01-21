import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Producto A', description: 'Nombre del producto' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Descripción del producto',
    description: 'Descripción del producto',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 100.0, description: 'Precio del producto' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 10,
    description: 'Cantidad en inventario',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 1, description: 'ID de la tienda asociada' })
  @IsNotEmpty()
  @IsNumber()
  storeId: number;
}
