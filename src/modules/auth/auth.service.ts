/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { UserLoginResponseDto } from './dtos/user-login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    if (!user.role) {
      throw new UnauthorizedException('El usuario no tiene un rol asignado');
    }

    return plainToInstance(User, user);
  }

  async login(loginDto: LoginDto): Promise<{ token: string; user: UserLoginResponseDto }> {
    const { email, password } = loginDto;

    const user = await this.validateUser(email, password);

    const payload = { id: user.id, email: user.email, role: user.role.nombre };
    const token = this.jwtService.sign(payload);

    const userResponse = plainToInstance(UserLoginResponseDto, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.nombre,
    });

    return { token, user: userResponse };
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { email, role: roleName } = registerDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const role = await this.roleRepository.findOne({ where: { nombre: roleName } });
    if (!role) {
      throw new NotFoundException(`El rol '${roleName}' no existe.`);
    }

    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
      role,
    });

    return this.userRepository.save(user);
  }
}
