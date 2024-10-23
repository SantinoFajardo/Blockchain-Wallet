import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../guards/auth.guard';

@Module({
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'MY_SECRET_KEY', // Cambia esto por una clave secreta segura
      signOptions: { expiresIn: '1h' }, // Configura la expiración del token
    }),
  ],
  exports: [JwtService],
})
export class JwtAuthModule {}
