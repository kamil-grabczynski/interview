import { Module } from '@nestjs/common';
import { AuthModule } from './services/auth/auth.module';
import { MoviesModule } from './services/movies/movies.module';
import { PrismaService } from './services/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { MoviesController } from './services/movies/movies.controller';
import { AuthController } from './services/auth/auth.controller';
import { MoviesService } from './services/movies/movies.service';
import { AuthService } from './services/auth/auth.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { env } from './config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: env.jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    MoviesModule,
    HttpModule,
  ],
  providers: [PrismaService, MoviesService, AuthService],
  controllers: [MoviesController, AuthController],
})
export class AppModule {}
