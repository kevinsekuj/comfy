import {
  COORDINATES_KEY,
  GENRE_ENDPOINT,
  LOOKUP_TABLE_ENDPOINT,
  LOOKUP_TABLE_KEY,
  MEDIA_CACHE_PREFIX,
  MEDIA_ENDPOINT,
  STORED_GENRE_ID_KEY,
  WEATHER_ENDPOINT,
} from '../../common/constants';
import { get, LocalStorage, SessionStorage, UserGeolocation } from '../../common/utils';
import { shuffleArray } from './helpers';

async function fetchSingleMedia(mediaId) {
  const key = `${MEDIA_CACHE_PREFIX}${mediaId}`;
  if (SessionStorage.has(key)) return SessionStorage.get(key);

  const response = await get(`${MEDIA_ENDPOINT}/${mediaId}`);
  SessionStorage.put(key, response);
  return response;
}

async function fetchMediaArray(genreIds, page = undefined) {
  let processedIds;
  if (SessionStorage.has(STORED_GENRE_ID_KEY)) {
    processedIds = SessionStorage.get(STORED_GENRE_ID_KEY);
  } else {
    processedIds = shuffleArray(genreIds).slice(0, 3).join(',');
    SessionStorage.put(STORED_GENRE_ID_KEY, processedIds);
  }
  if (page && SessionStorage.has(page)) return SessionStorage.get(page);

  const genreEndpoint = `${GENRE_ENDPOINT}/${processedIds}`;
  const result = await get(page ? `${genreEndpoint}/pages/${page}` : genreEndpoint);

  SessionStorage.put(page ?? 1, result);
  return result;
}

async function fetchGenreIdTable() {
  if (LocalStorage.has(LOOKUP_TABLE_KEY)) {
    return LocalStorage.get(LOOKUP_TABLE_KEY);
  }
  const response = await get(LOOKUP_TABLE_ENDPOINT);

  LocalStorage.put(LOOKUP_TABLE_KEY, response);
  return response;
}

async function fetchWeather() {
  let response;

  if (SessionStorage.has(COORDINATES_KEY)) {
    response = SessionStorage.get(COORDINATES_KEY);
  } else {
    response = await UserGeolocation.getUserCurrentCoordinates();
    SessionStorage.put(COORDINATES_KEY, response);
  }

  const result = await get(WEATHER_ENDPOINT, response);
  return result;
}

export { fetchGenreIdTable, fetchWeather, fetchMediaArray, fetchSingleMedia };
