import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  // logging: true,
  // ssl: true,
  entities: [join(__dirname + '../../**/*.entity.{js,ts}')], //Comienza a buscar desde la carpeta raiz incluido /dist
  synchronize: true,
});
console.log(__dirname);
console.log(__filename);
console.log(join(__dirname + '../../**/*.entity.{js,ts}'));
