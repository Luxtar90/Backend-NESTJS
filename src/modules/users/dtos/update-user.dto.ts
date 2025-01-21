import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RegisterDto } from '../../auth/dtos/register.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(RegisterDto) {
  @ApiProperty({
    example: 'admin',
    description: 'Nombre del rol del usuario',
    required: false,
  })
  @IsOptional()
  @IsString()
  role?: string;
}
