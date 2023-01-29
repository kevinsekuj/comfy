import {
  DECIMAL_BASE,
  HTTP_BAD_GATEWAY,
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_OK,
} from '@utils/constants';
import HTTPError from '@utils/httpError';
import axios, { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';

interface TMDBResponse extends AxiosResponse {
  data: {
    id: number;
    results: Array<{
      iso_639_1: string;
      iso_3166_1: string;
      name: string;
      key: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: string;
      id: string;
    }>;
  };
}

function generateApiUrl(id: string) {
  return `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
}

export default function getMedia() {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<JSON>> => {
    const { id } = req?.params ?? {};

    if (!id || Number.isNaN(parseInt(id, DECIMAL_BASE))) {
      return next(
        new HTTPError(
          `${!id ? 'ID parameter is required' : 'ID must be an integer'}`,
          HTTP_BAD_REQUEST,
        ),
      );
    }

    let response: TMDBResponse;
    try {
      response = await axios.get(generateApiUrl(id));
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
    const mediaInfo = data.results.find(
      (mediaObject) => mediaObject.type === 'Trailer',
    );

    res.status(status).json({
      language: mediaInfo?.iso_639_1,
      country: mediaInfo?.iso_3166_1,
      trailerUrlKey: mediaInfo?.key,
      name: mediaInfo?.name,
      type: mediaInfo?.type,
    });
    return undefined;
  };
}
