import { IsString, MinLength } from 'class-validator';

export class CreateMovieModel {
  @MinLength(1)
  @IsString()
  title: string;
}
