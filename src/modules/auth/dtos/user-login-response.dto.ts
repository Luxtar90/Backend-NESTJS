import { ApiProperty } from '@nestjs/swagger';

export class UserLoginResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;
}
