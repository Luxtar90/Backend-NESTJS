import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { AvailabilityService } from './availability.service';

@ApiTags('Disponibilidad')
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get()
  @ApiQuery({
    name: 'employeeId',
    type: Number,
    description: 'ID del empleado',
  })
  @ApiQuery({
    name: 'date',
    type: String,
    description: 'Fecha en formato YYYY-MM-DD',
  })
  getAvailability(
    @Query('employeeId') employeeId: number,
    @Query('date') date: string,
  ) {
    return this.availabilityService.getEmployeeAvailability(employeeId, date);
  }
}
