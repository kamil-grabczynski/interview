import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService, PrismaService],
      imports: [HttpModule],
    }).compile();
    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('[Movies] Controller should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.createMovie).toBeDefined();
    expect(controller.getMovies).toBeDefined();
  });
  it('[Movies] Service should be defined', () => {
    expect(service).toBeDefined();
    expect(service.createMovie).toBeDefined();
    expect(service.getMovieFromApi).toBeDefined();
    expect(service.getMovies).toBeDefined();
  });
});
