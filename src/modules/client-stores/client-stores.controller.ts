import { Controller, Get, Post, Put, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ClientStoresService } from './client-stores.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateClientStoreDto } from './dtos/create-client-store.dto';
import { UpdatePointsDto } from './dtos/update-points.dto';

@ApiTags('client-stores')
@Controller('client-stores')
export class ClientStoresController {
  constructor(private readonly clientStoresService: ClientStoresService) {}

  @Get('client/:idCliente')
  @ApiOperation({ summary: 'Obtener todas las tiendas de un cliente' })
  @ApiResponse({ status: 200, description: 'Lista de relaciones cliente-tienda' })
  async findAllByClientId(@Param('idCliente', ParseIntPipe) idCliente: number) {
    return this.clientStoresService.findAllByClientId(idCliente);
  }

  @Get('store/:idTienda')
  @ApiOperation({ summary: 'Obtener todos los clientes de una tienda' })
  @ApiResponse({ status: 200, description: 'Lista de relaciones cliente-tienda' })
  async findAllByStoreId(@Param('idTienda', ParseIntPipe) idTienda: number) {
    return this.clientStoresService.findAllByStoreId(idTienda);
  }

  @Get(':idCliente/:idTienda')
  @ApiOperation({ summary: 'Obtener una relación cliente-tienda específica' })
  @ApiResponse({ status: 200, description: 'Relación cliente-tienda' })
  async findOne(
    @Param('idCliente', ParseIntPipe) idCliente: number,
    @Param('idTienda', ParseIntPipe) idTienda: number,
  ) {
    return this.clientStoresService.findOne(idCliente, idTienda);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva relación cliente-tienda' })
  @ApiResponse({ status: 201, description: 'Relación cliente-tienda creada' })
  async create(@Body() createClientStoreDto: CreateClientStoreDto) {
    return this.clientStoresService.create(createClientStoreDto);
  }

  @Put(':idCliente/:idTienda/points')
  @ApiOperation({ summary: 'Actualizar puntos de un cliente en una tienda' })
  @ApiResponse({ status: 200, description: 'Puntos actualizados' })
  async updatePoints(
    @Param('idCliente', ParseIntPipe) idCliente: number,
    @Param('idTienda', ParseIntPipe) idTienda: number,
    @Body() updatePointsDto: UpdatePointsDto,
  ) {
    return this.clientStoresService.updatePoints(
      idCliente,
      idTienda,
      updatePointsDto.puntos,
    );
  }

  @Delete(':idCliente/:idTienda')
  @ApiOperation({ summary: 'Desactivar una relación cliente-tienda' })
  @ApiResponse({ status: 200, description: 'Relación desactivada' })
  async deactivate(
    @Param('idCliente', ParseIntPipe) idCliente: number,
    @Param('idTienda', ParseIntPipe) idTienda: number,
  ) {
    return this.clientStoresService.deactivate(idCliente, idTienda);
  }

  @Patch(':idCliente/:idTienda/restore')
  @ApiOperation({ summary: 'Restaurar una relación cliente-tienda desactivada' })
  @ApiResponse({ status: 200, description: 'Relación restaurada' })
  async restore(
    @Param('idCliente', ParseIntPipe) idCliente: number,
    @Param('idTienda', ParseIntPipe) idTienda: number,
  ) {
    return this.clientStoresService.restore(idCliente, idTienda);
  }
}
