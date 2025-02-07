import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir solicitudes desde cualquier origen (ajustar en producción)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Configuración de Swagger para documentación de la API
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API for the mobile application')
    .setVersion('1.0')
    .addTag('Authentication') // Etiqueta para autenticación
    .addTag('Disponibilidad') // Agrega el módulo de Disponibilidad
    .addTag('Usuarios') // Puedes añadir más módulos si es necesario
    .addBearerAuth() // Para manejar autenticación con tokens JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true }, // Mantiene el token en Swagger
  });

  console.log(`🚀 API corriendo en: http://localhost:3000/api`); // Mensaje para verificar en consola

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
