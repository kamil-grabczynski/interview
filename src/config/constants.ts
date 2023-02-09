import { env } from './env';

export const constants = {
  omdbApiUrl: `http://www.omdbapi.com/?apikey=${env.omdbApiKey}`,
};
