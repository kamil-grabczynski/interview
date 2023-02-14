import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService, PrismaService],
      imports: [HttpModule],
    }).compile();
    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
