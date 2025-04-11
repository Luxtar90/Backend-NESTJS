import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir solicitudes desde cualquier origen
  app.enableCors({
    origin: true, // Permite cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Configurar el prefijo global /api para todas las rutas
  app.setGlobalPrefix('api');

  // Configuración de Swagger para documentación de la API
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API for the mobile application')
    .setVersion('1.0')
    .addTag('Authentication')
    .addTag('Disponibilidad')
    .addTag('Usuarios')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  // Escuchar en todas las interfaces
  await app.listen(3000, '0.0.0.0');
  const serverUrl = await app.getUrl();
  console.log(`📚 Documentación disponible en: ${serverUrl}/api-docs`);
}

bootstrap();
