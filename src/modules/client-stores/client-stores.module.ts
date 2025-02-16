import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientStore } from '../../entities/client-store.entity';
import { ClientStoresService } from './client-stores.service';
import { ClientStoresController } from './client-stores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClientStore])],
  providers: [ClientStoresService],
  controllers: [ClientStoresController],
  exports: [ClientStoresService],
})
export class ClientStoresModule {}
