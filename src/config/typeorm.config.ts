import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Store } from '../entities/store.entity';
import { Product } from '../entities/product.entity';
import { Service } from '../entities/service.entity';
import { Client } from 'src/entities/client.entity';
import { Employee } from 'src/entities/employee.entity';
import { Reservation } from 'src/entities/reservation.entity';
import { Appointment } from 'src/entities/appointment.entity';
import { ClientStore } from 'src/entities/client-store.entity';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [
    User,
    Role,
    Store,
    Product,
    Service,
    Client,
    Employee,
    Reservation,
    Appointment,
    ClientStore,
  ],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
});
