import {
  DECIMAL_BASE,
  HTTP_BAD_GATEWAY,
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_OK
} from '@utils/constants';
import HTTPError from '@utils/httpError';
import axios, { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';

const QUERY_PARAM_SEPARATOR = ',';
const GENRE_ID_LIMIT = 19;

interface TMDBGenreResponse extends AxiosResponse {
  data: {
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<{
      adult: boolean;
      backdrop_path: string;
      genre_ids: Array<number>;
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }>;
  };
}

const genreIDMap = new Map([
  [28, 'Action'],
  [12, 'Adventure'],
  [16, 'Animation'],
  [35, 'Comedy'],
  [80, 'Crime'],
  [99, 'Documentary'],
  [18, 'Drama'],
  [10751, 'Family'],
  [14, 'Fantasy'],
  [36, 'History'],
  [27, 'Horror'],
  [10402, 'Music'],
  [9648, 'Mystery'],
  [10749, 'Romance'],
  [878, 'Science Fiction'],
  [10770, 'TV Movie'],
  [53, 'Thriller'],
  [10752, 'War'],
  [37, 'Western'],
]);

function generateApiUrl(joinedGenreIDs: string, page = '1'): string {
  return `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${joinedGenreIDs}`;
}

function isValidGenreId(genreID: string): boolean {
  return (
    !!genreID &&
    !Number.isNaN(parseInt(genreID, DECIMAL_BASE)) &&
    [...genreIDMap.keys()].includes(parseInt(genreID, DECIMAL_BASE))
  );
}

export default function getMediaByGenre() {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<JSON>> => {
    const { genreIDs, pageNumber } = req?.params ?? {};

    const genreIDCandidates = genreIDs.split(
      QUERY_PARAM_SEPARATOR,
      GENRE_ID_LIMIT,
    );

    const validGenreIDs = genreIDCandidates
      .map((genreID) => genreID.trim())
      .filter((processedGenreID) => isValidGenreId(processedGenreID));

    if (validGenreIDs.length === 0)
      return next(new HTTPError('ID parameter is required', HTTP_BAD_REQUEST));

    let response: TMDBGenreResponse;
    try {
      response = await axios.get(
        generateApiUrl(
          validGenreIDs.join(','),
          pageNumber !== '1' ? pageNumber : undefined,
        ),
      );
    } catch (e) {
      /* eslint-disable no-console */
      console.log(`Axios error: ${e.message}`);
      return next(
        new HTTPError('GET request failed', HTTP_INTERNAL_SERVER_ERROR),
      );
    }

    if (response.status !== HTTP_OK) {
      return next(new HTTPError('TMDB API request failed', HTTP_BAD_GATEWAY));
    }

    const { status, data } = response;
    const { results, page } = data;

    res.status(status).json({
      page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      media: results.map((mediaObject) => ({
        id: mediaObject.id,
        title: mediaObject.title,
        language: mediaObject.original_language,
        year: mediaObject.release_date,
        overview: mediaObject.overview,
        voteAverage: mediaObject.vote_average,
        popularity: mediaObject.popularity,
        backdropPath: mediaObject.backdrop_path,
        posterPath: mediaObject.poster_path,
        genreIDs: mediaObject.genre_ids.map((genreID) => [
          genreIDMap.get(genreID),
          genreID,
        ]),
      })),
    });
    return undefined;
  };
}
