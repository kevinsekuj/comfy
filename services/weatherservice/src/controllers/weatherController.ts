import {
  HTTP_BAD_GATEWAY,
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_OK,
} from '@utils/constants';
import HTTPError from '@utils/httpError';
import axios, { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';

// https://openweathermap.org/current#current_JSON
interface OpenWeatherResponse extends AxiosResponse {
  data: {
    coord: Record<string, number>;
    weather: Array<Record<string, number | string>>;
    base: string;
    main: Record<string, number>;
    visibility: number;
    wind: Record<string, number>;
    rain: Record<string, number>;
    clouds: Record<string, number>;
    dt: number;
    sys: Record<string, number | string>;
    timezone: number;
    id: number;
    name: string;
    cod: number;
  };
}

function generateMissingParameterMessage(
  latitude: string,
  longitude: string,
): string {
  if (!latitude && !longitude) {
    return "Query parameters 'latitude' and 'longitude' missing";
  }
  return `Query parameter '${latitude ? 'longitude' : 'latitude'}' missing`;
}

function getApiUrl(latitude: string, longitude: string): string {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;
}

export default function getWeatherData() {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<JSON>> => {
    const { latitude, longitude } = req?.query ?? {};

    if (!latitude || !longitude) {
      return next(
        new HTTPError(
          generateMissingParameterMessage(
            latitude as string,
            longitude as string,
          ),
          HTTP_BAD_REQUEST,
        ),
      );
    }

    if (typeof latitude !== 'string' || typeof longitude !== 'string') {
      return next(
        new HTTPError(
          'Query parameters must be of type string.',
          HTTP_BAD_REQUEST,
        ),
      );
    }

    let response: OpenWeatherResponse;
    try {
      response = await axios.get(getApiUrl(latitude, longitude));
    } catch (e) {
      /* eslint-disable no-console */
      console.log(`Axios error: ${e.message}`);
      return next(
        new HTTPError('GET request failed', HTTP_INTERNAL_SERVER_ERROR),
      );
    }
    if (response.status !== HTTP_OK) {
      return next(
        new HTTPError('OpenWeather API request failed.', HTTP_BAD_GATEWAY),
      );
    }

    const { status } = response;
    const { weather, main } = response.data;

    res
      .status(status)
      .json({ temperature: main.temp, weather: weather[0].main, status });
    return undefined;
  };
}
