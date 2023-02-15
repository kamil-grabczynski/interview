import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('[Auht] Controller should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.login).toBeDefined();
  });
  it('[Auth] Service should be defined', () => {
    expect(service).toBeDefined();
    expect(service.login).toBeDefined();
    expect(service.validateUser).toBeDefined();
  });
});
