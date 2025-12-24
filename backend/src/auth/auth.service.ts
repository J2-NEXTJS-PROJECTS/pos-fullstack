import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { createHash, timingSafeEqual } from 'crypto';
@Injectable()
export class AuthService {
  constructor(
    //! Inyectamos UsersService y JwtService
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // ✅ helper para hash SHA-256 (sin límite 72 bytes)
  private hashRefreshToken(token: string): string {
    return createHash('sha256').update(token).digest('hex'); // 64 chars
  }

  // ✅ comparación segura
  private safeEqual(a: string, b: string): boolean {
    // timingSafeEqual exige mismo largo
    if (a.length !== b.length) return false;
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  }

  async signup(email: string, password: string): Promise<User> {
    if (await this.usersService.findByEmail(email)) {
      throw new BadRequestException('Usuario ya existe');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    return this.usersService.createClient(email, passwordHash);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    //console.log(user);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    //console.log(password, user.passwordHash);
    //compare vuelve aplicar el hash al password y lo compara con el hash guardado
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  //! Genera los tokens y guarda el hash del refresh token en bd
  async login(user: User) {
    const payload = { sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    //console.log({ refreshToken });
    //const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    // ✅ guardamos hash SHA-256, no bcrypt
    const refreshTokenHash = this.hashRefreshToken(refreshToken);
    //console.log({ refreshTokenHash });
    await this.usersService.updateRefreshToken(user.id, refreshTokenHash);

    return { accessToken, refreshToken };
  }
  //Rotamos los tokens
  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (!user.refreshTokenHash) {
      throw new UnauthorizedException('Refresh token not found');
    }

    console.log('incoming token:', refreshToken);
    console.log('incoming length:', refreshToken.length);
    console.log('user id/email:', user.id, user.email);
    console.log('stored token refresh hashed:', user.refreshTokenHash);
    //const isValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    const incomingTokenHashed = this.hashRefreshToken(refreshToken);
    console.log('incoming token hashed:', incomingTokenHashed);
    const isValid = this.safeEqual(incomingTokenHashed, user.refreshTokenHash);
    console.log({ isValid });
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { sub: user.id, role: user.role };
    //! Generamos nuevos tokens
    const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    //! vuelve a hashear refreshh y lo guarda (rotacion de refresh token)
    const before = user.refreshTokenHash;
    //const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
    const newRefreshTokenHash = this.hashRefreshToken(newRefreshToken);
    await this.usersService.updateRefreshToken(user.id, newRefreshTokenHash);
    const afterUser = await this.usersService.findById(user.id);
    console.log({ afterChange: afterUser.refreshTokenHash });
    console.log(`has changed ${before !== afterUser.refreshTokenHash}`);
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(userId: number): Promise<void> {
    //! Invalida el refresh token guardado en DB.
    //! Aunque alguien conserve un refresh token viejo, ya no pasa el compare.
    await this.usersService.updateRefreshToken(userId, null);
  }
}
