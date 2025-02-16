import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../../entities/appointment.entity';
import { Employee } from '../../entities/employee.entity';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async getEmployeeAvailability(
    employeeId: number,
    date: string,
  ): Promise<string[]> {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException(
        `Empleado con ID ${employeeId} no encontrado.`,
      );
    }

    const appointments = await this.appointmentRepository.find({
      where: { employee: { id: employeeId }, date },
    });

    const takenSlots = appointments.map((appointment) => appointment.time);

    const allSlots = Array.from(
      { length: 9 },
      (_, i) => `${(8 + i).toString().padStart(2, '0')}:00`,
    ); // Horas de 08:00 a 16:00

    return allSlots.filter((slot) => !takenSlots.includes(slot));
  }
}
