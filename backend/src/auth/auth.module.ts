import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    //!conectamos a UserModule
    UsersModule,
    //!Registra las dependencias PassportModule,JwtModule
    PassportModule,
    //!Permite leer variables de entorno e inyectar JwtService en AuthService
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [AuthController],
  //! Registra JwtStrategy como provider

  //  ¿Cómo sabe Passport que existe JwtStrategy?
  // Por esto 👇 en AuthModule:
  providers: [AuthService, JwtStrategy],
  //!exporta AuthService
  exports: [AuthService],
})
export class AuthModule {}
