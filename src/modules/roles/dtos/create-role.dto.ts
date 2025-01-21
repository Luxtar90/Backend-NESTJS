import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'Nombre del rol' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({
    example: 'Administrador del sistema',
    description: 'Descripción del rol',
  })
  @IsNotEmpty()
  @IsString()
  descripcion: string;
}
