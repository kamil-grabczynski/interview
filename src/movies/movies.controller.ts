import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateMovieModel } from '../../models/CreateMovieModel';
import { CurrentUserAccount } from 'types';
import { CurrentUser, JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private _moviesService: MoviesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createMovie(
    @Body() createMovieModel: CreateMovieModel,
    @CurrentUser() user: CurrentUserAccount,
  ) {
    return this._moviesService.createMovie(createMovieModel, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getMovies(@CurrentUser() user: CurrentUserAccount) {
    return this._moviesService.getMovies(user);
  }
}
