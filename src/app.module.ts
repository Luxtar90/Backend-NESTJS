import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { typeOrmConfig } from './config/typeorm.config';
import { StoresModule } from './modules/stores/stores.module';
import { ProductsModule } from './modules/products/products.module';
import { ServicesModule } from './modules/services/services.module';
import { ClientsModule } from './modules/clients/clients.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { AppointmentsModule } from './modules/appointment/appointment.module';
import { AvailabilityModule } from './modules/availability/availability.module';
import { ClientStoresModule } from './modules/client-stores/client-stores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    StoresModule,
    ProductsModule,
    ServicesModule,
    ClientsModule,
    ReservationsModule,
    EmployeesModule,
    AppointmentsModule,
    AvailabilityModule,
    ClientStoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
