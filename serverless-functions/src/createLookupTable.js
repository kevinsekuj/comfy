import {
  TIME_OF_DAY_GENRE_MAPPINGS,
  WEATHER_EVENT_MAPPINGS,
} from './genreMappings.js';

function getSetIntersectionAsArray(a, b) {
  return [...a].filter((element) => b.has(element));
}

export default async function createLookupTable() {
  const lookupTable = new Map();

  return new Promise((resolve) => {
    [...TIME_OF_DAY_GENRE_MAPPINGS.keys()].forEach((timeOfDay) => {
      [...WEATHER_EVENT_MAPPINGS.keys()].forEach((weatherEvent) => {
        lookupTable.set(
          `${timeOfDay},${weatherEvent}`,
          getSetIntersectionAsArray(
            TIME_OF_DAY_GENRE_MAPPINGS.get(timeOfDay),
            WEATHER_EVENT_MAPPINGS.get(weatherEvent),
          ),
        );
      });
    });
    resolve(lookupTable);
  });
}
