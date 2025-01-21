import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    example: 1,
    description: 'ID del usuario asociado al cliente',
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
