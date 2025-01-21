import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from '../../entities/employee.entity';
import { User } from '../../entities/user.entity';
import { Store } from '../../entities/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, User, Store])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
