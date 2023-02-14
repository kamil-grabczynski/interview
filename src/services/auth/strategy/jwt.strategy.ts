import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { env } from '../../../config/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(PrismaService) private readonly _prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.jwtSecret,
    });
  }

  async validate(payload: any) {
    const user = await this._prismaService.user.findFirst({
      where: {
        id: payload.sub,
        username: payload.username,
      },
    });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
