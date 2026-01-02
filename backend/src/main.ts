import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  // Para forzar que se cumplan los DTOS
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  // Si tu frontend estará en otro origen (ej: localhost:3001)
  app.enableCors({
    //origin: ['http://localhost:3001'],
    origin: 'http://localhost:3001',
    credentials: true,
  });
  //!Para poder acceder a la carpeta public. Fue necesario configurar NestFactory.create con la interfaz NestExpressApplication
  app.useStaticAssets(join(__dirname, '../public'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
