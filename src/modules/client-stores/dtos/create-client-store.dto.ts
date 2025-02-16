import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class CreateClientStoreDto {
  @ApiProperty({
    description: 'ID del cliente',
    example: 1,
  })
  @IsNumber()
  idCliente: number;

  @ApiProperty({
    description: 'ID de la tienda',
    example: 1,
  })
  @IsNumber()
  idTienda: number;

  @ApiProperty({
    description: 'Puntos acumulados iniciales',
    example: 0,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  puntosAcumulados?: number;
}
