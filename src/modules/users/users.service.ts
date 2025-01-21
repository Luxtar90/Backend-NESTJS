import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role) // Inyecta el repositorio de roles
    private readonly roleRepository: Repository<Role>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, role: roleName } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const role = await this.roleRepository.findOne({
      where: { nombre: roleName },
    });
    if (!role) {
      throw new NotFoundException(`El rol '${roleName}' no existe.`);
    }

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { deletedAt: null },
      relations: ['role'],
    });
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id, deletedAt: null },
      relations: ['role'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { role, ...rest } = updateUserDto;

    // Verifica si se está actualizando el rol
    let roleEntity = null;
    if (role) {
      roleEntity = await this.roleRepository.findOne({
        where: { nombre: role },
      });
      if (!roleEntity) {
        throw new NotFoundException(`El rol '${role}' no existe.`);
      }
    }

    // Actualiza el usuario con el resto de los campos y la entidad del rol
    await this.userRepository.update(id, {
      ...rest,
      role: roleEntity, // Asigna la entidad en lugar de un string
    });

    return this.findOne(id);
  }

  async restore(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      withDeleted: true, // Incluye usuarios eliminados
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.userRepository.restore(id);
    return this.findOne(id); // Devuelve el usuario restaurado
  }

  async softDelete(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      return null;
    }
    await this.userRepository.softDelete(id);
    return user;
  }
}
