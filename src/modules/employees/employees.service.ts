import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../../entities/employee.entity';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { User } from '../../entities/user.entity';
import { Store } from '../../entities/store.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({ relations: ['user', 'store'] });
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['user', 'store'],
    });

    if (!employee) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }

    return employee;
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { userId, storeId, ...rest } = createEmployeeDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    const store = storeId
      ? await this.storeRepository.findOneBy({ id: storeId })
      : null;

    const employee = this.employeeRepository.create({
      user,
      store,
      ...rest,
    });
    return this.employeeRepository.save(employee);
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.findOne(id);

    const { storeId, ...rest } = updateEmployeeDto;

    if (storeId) {
      const store = await this.storeRepository.findOneBy({ id: storeId });
      if (!store) {
        throw new NotFoundException(`Tienda con ID ${storeId} no encontrada`);
      }
      employee.store = store;
    }

    Object.assign(employee, rest);
    return this.employeeRepository.save(employee);
  }

  async remove(id: number): Promise<void> {
    const employee = await this.findOne(id);
    await this.employeeRepository.softRemove(employee);
  }

  async restore(id: number): Promise<void> {
    await this.employeeRepository.restore(id);
  }
}
