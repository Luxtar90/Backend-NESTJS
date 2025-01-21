import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../../entities/appointment.entity';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';
import { Client } from '../../entities/client.entity';
import { Employee } from '../../entities/employee.entity';
import { Service } from '../../entities/service.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: ['client', 'employee', 'service'],
    });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['client', 'employee', 'service'],
    });

    if (!appointment) {
      throw new NotFoundException('Cita no encontrada');
    }

    return appointment;
  }

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const client = await this.clientRepository.findOne({
      where: { user: { id: createAppointmentDto.clientId } }, // Relación con User
      relations: ['user'],
    });
    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const employee = await this.employeeRepository.findOne({
      where: { user: { id: createAppointmentDto.employeeId } }, // Relación con User
      relations: ['user'],
    });
    if (!employee) {
      throw new NotFoundException('Empleado no encontrado');
    }

    const service = await this.serviceRepository.findOne({
      where: { id: createAppointmentDto.serviceId },
    });
    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }

    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      client,
      employee,
      service,
    });

    return this.appointmentRepository.save(appointment);
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = await this.findOne(id);

    Object.assign(appointment, updateAppointmentDto);
    return this.appointmentRepository.save(appointment);
  }

  async delete(id: number): Promise<void> {
    const appointment = await this.findOne(id);
    await this.appointmentRepository.softDelete(appointment.id);
  }

  async restore(id: number): Promise<void> {
    await this.appointmentRepository.restore(id);
  }
}
