import { User as PrismaUser } from '@prisma/client';

export type CurrentUserAccount = Omit<PrismaUser, 'password'>;

export enum Role {
  basic = 'basic',
  premium = 'premium',
}

export type MovieFromApi = {
  Title: string;
  Released: string;
  Genre: string;
  Director: string;
};
