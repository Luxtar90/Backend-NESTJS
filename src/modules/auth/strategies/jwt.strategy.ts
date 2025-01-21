import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Opción por defecto, pero puedes omitirla
      secretOrKey: configService.get<string>('JWT_SECRET'), // Obtiene la clave secreta
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
