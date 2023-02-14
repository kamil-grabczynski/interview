import { Movie } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MovieDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  released: Date | null;
  @ApiProperty()
  genre: string | null;
  @ApiProperty()
  director: string | null;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(movie: Movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.released = movie.released;
    this.genre = movie.genre;
    this.director = movie.director;
  }
}
