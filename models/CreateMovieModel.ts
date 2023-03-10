import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateMovieModel {
  @ApiProperty()
  @MinLength(1)
  @IsString()
  title: string;
}
