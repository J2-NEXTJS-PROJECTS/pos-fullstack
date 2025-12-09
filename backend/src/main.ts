import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Para forzar que se cumplan los DTOS
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  //!Para poder acceder a la carpeta public. Fue necesario configurar NestFactory.create con la interfaz NestExpressApplication
  app.useStaticAssets(join(__dirname, '../public'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
