import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  // - Crea un Application Context
  // - NO crea servidor HTTP
  // - NO abre puertos
  // - Inicializa:
  //   - DI container
  //   - TypeORM
  //   - ConfigModule
  //   - Providers
  const app = await NestFactory.createApplicationContext(SeederModule);
  // Aquí pasa algo importante conceptualmente:
  // - NestJS ya:
  //   - Inyectó repositorios
  //   - Conectó a la BD
  //   - Ejecutó onModuleInit()
  // Tú solo pides:
  // > “Dame una instancia lista de SeederService”
  // No haces new SeederService()
  // No rompes DI
  // No haces magia
  // ✅ Uso correcto de NestJS.
  const seeder = app.get(SeederService);
  await seeder.seed();
  await app.close();
}
bootstrap();
