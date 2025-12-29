import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: this.configService.get<string>('MAILER_SERVICE'),
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASS'),
      },
    });
  }

  async sendPasswordReset(email: string, link: string): Promise<void> {
    try {
      // console.log(this.configService.get<string>('GMAIL_USER'));
      // console.log(this.configService.get<string>('GMAIL_PASS'));
      await this.transporter.sendMail({
        from: this.configService.get<string>('GMAIL_USER'),
        to: email,
        subject: 'Recuperación de contraseña',
        html: `
          <h2>Recuperación de contraseña</h2>
          <p>Has solicitado restablecer tu contraseña.</p>
          <p>Haz clic en el siguiente enlace para continuar:</p>
          <a href="${link}">${link}</a>
          <p>Este enlace expira en 15 minutos.</p>
          <br />
          <p>Si no solicitaste este cambio, ignora este correo.</p>
        `,
      });
    } catch (error) {
      console.error('Error sending email', error);
      throw new InternalServerErrorException('Error enviando el correo');
    }
  }
}
