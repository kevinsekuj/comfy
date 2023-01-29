import { ONCLICK_DELAY } from '../../common/constants';

function handleButtonClickDelay(setIsButtonClickDisabled) {
  setTimeout(() => {
    setIsButtonClickDisabled(false);
  }, ONCLICK_DELAY);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function isPageOutOfBounds(pageNumber, totalPages) {
  return pageNumber <= 0 && pageNumber >= totalPages;
}

function getTimeOfDay() {
  const currentHour = new Date().getHours();

  const timeOfDayArray = [
    [0, 'night'],
    [5, 'early morning'],
    [8, 'late morning'],
    [12, 'early afternoon'],
    [15, 'late afternoon'],
    [17, 'early evening'],
    [19, 'late evening'],
    [21, 'night'],
  ];

  let timeOfDay = timeOfDayArray[0][1];

  for (let i = 0; i < timeOfDayArray.length; i += 1) {
    if (currentHour < timeOfDayArray[i][0]) {
      break;
    }
    timeOfDay = timeOfDayArray[i][1];
  }
  return timeOfDay;
}

function getGenreIds(weatherEvent, lookupTable) {
  return lookupTable[`${getTimeOfDay()},${weatherEvent}`];
}

export { getTimeOfDay, getGenreIds, isPageOutOfBounds, shuffleArray, handleButtonClickDelay };
