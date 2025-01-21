# Proyecto Backend con NestJS

Este es un backend desarrollado con **NestJS 10.4.9** que implementa múltiples módulos para manejar usuarios, roles, tiendas, productos, servicios, reservas y citas. Incluye autenticación JWT y una documentación completa con Swagger.

## Tecnologías Utilizadas

- **NestJS**: Framework principal (v10.4.9).
- **TypeORM**: ORM para manejar la base de datos.
- **PostgreSQL**: Base de datos relacional.
- **Swagger**: Documentación interactiva de la API (v8.1.1).

## Dependencias Principales

- **NestJS CLI**: `@nestjs/cli@10.4.9`
- **Swagger**: `@nestjs/swagger@8.1.1`
- **TypeORM**: `typeorm@0.3.20`
- **JWT**: `@nestjs/jwt@11.0.0`
- **PostgreSQL Client**: `pg@8.13.1`
- **Bcrypt**: `bcrypt@5.1.1`

Asegúrate de que las dependencias anteriores están configuradas correctamente en tu entorno.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/xavinavi545/Backend-NESTJS.git
   cd Backend-NESTJS
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` basado en `.env.example`:
   ```plaintext
   DB_HOST=tu_host
   DB_PORT=5432
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=tu_base_de_datos
   JWT_SECRET=tu_clave_secreta
   ```

4. Configura la base de datos:
   - Asegúrate de tener PostgreSQL corriendo y crea una base de datos que coincida con `DB_NAME`.

5. Corre las migraciones si las tienes configuradas:
   ```bash
   npm run migration:run
   ```

6. Inicia el servidor:
   ```bash
   npm run start:dev
   ```

## Endpoints y Documentación

Swagger está disponible en:
```
http://localhost:3000/api
```

Ejemplo de configuración de Swagger en `main.ts`:
```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('API para la aplicación móvil')
  .setVersion('1.0')
  .addTag('Authentication')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

## Scripts Disponibles

- `npm run start`: Inicia el servidor en modo producción.
- `npm run start:dev`: Inicia el servidor en modo desarrollo.
- `npm run build`: Compila el proyecto.
- `npm run test`: Ejecuta las pruebas unitarias.
- `npm run migration:run`: Ejecuta las migraciones pendientes.

## Notas Adicionales



