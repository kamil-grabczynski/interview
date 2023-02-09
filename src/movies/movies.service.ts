import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUserAccount, MovieFromApi, Role } from '../../types';
import { CreateMovieModel } from '../../models/CreateMovieModel';
import * as moment from 'moment';
import { HttpService } from '@nestjs/axios';
import { constants } from '../config/constants';
import { MovieDTO } from '../DTO/MovieDTO';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(PrismaService) private readonly _prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getMovieFromApi(title: string): Promise<MovieFromApi | null> {
    const queryParams = new URLSearchParams({
      t: title,
    });
    const queryUrl = `${constants.omdbApiUrl}&${queryParams}`;
    try {
      const { data } = await this.httpService.get(queryUrl).toPromise();
      if (data?.Response === 'False') {
        return null;
      }
      return data;
    } catch (error) {
      return null;
    }
  }

  async createMovie(
    createMovieModel: CreateMovieModel,
    user: CurrentUserAccount,
  ) {
    if (user.role === Role.basic) {
      const startMonth = moment(new Date()).startOf('M');
      const endMonth = moment(new Date()).endOf('M');

      const createdMoviesInCurrentMoth =
        await this._prismaService.movie.findMany({
          where: {
            userId: user.id,
            createdAt: {
              lte: endMonth.toDate(),
              gte: startMonth.toDate(),
            },
          },
        });
      if (createdMoviesInCurrentMoth.length >= 5) {
        throw new BadRequestException(
          'You have reached the limit of creating videos for a standard user (5 movies per month)',
        );
      }
    }
    const movieFromApi = await this.getMovieFromApi(createMovieModel.title);
    if (!movieFromApi) {
      throw new NotFoundException('Movie from api not found');
    }

    const checkTitleAlreadyExists = await this._prismaService.movie.findFirst({
      where: {
        title: movieFromApi?.Title,
        userId: user.id,
      },
    });
    if (checkTitleAlreadyExists) {
      throw new BadRequestException(
        `Movie with title ${createMovieModel.title} already exists`,
      );
    }
    const movie = await this._prismaService.movie.create({
      data: {
        title: movieFromApi.Title,
        director: movieFromApi.Director,
        genre: movieFromApi.Genre,
        released: movieFromApi.Released && new Date(movieFromApi.Released),
        userId: user.id,
      },
    });

    return new MovieDTO(movie);
  }

  async getMovies(user: CurrentUserAccount) {
    const movies = await this._prismaService.movie.findMany({
      where: {
        userId: user.id,
      },
    });
    return movies.map((m) => new MovieDTO(m));
  }
}
