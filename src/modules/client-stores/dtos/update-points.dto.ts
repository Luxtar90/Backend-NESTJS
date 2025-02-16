import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdatePointsDto {
  @ApiProperty({
    description: 'Nuevos puntos acumulados',
    example: 100,
  })
  @IsNumber()
  @Min(0)
  puntos: number;
}
