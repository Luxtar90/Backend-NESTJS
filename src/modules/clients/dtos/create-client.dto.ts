import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'ID del usuario asociado al cliente',
    example: 1,
  })
  @IsNumber()
  id_user: number;
}
