import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe', description: 'Nombre del usuario' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email del usuario',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: '+123456789',
    description: 'Teléfono del usuario',
    required: false,
  })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({
    example: 'admin',
    description: 'Rol del usuario (admin, employee, client)',
  })
  @IsNotEmpty()
  @IsString()
  role: string; // Este será el nombre del rol, no el ID
}
