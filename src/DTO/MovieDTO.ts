import { Movie } from '@prisma/client';

export class MovieDTO {
  id: number;
  title: string;
  released: Date | null;
  genre: string | null;
  director: string | null;
  userId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(movie: Movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.released = movie.released;
    this.genre = movie.genre;
    this.director = movie.director;
  }
}
