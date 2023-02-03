import { useEffect, useRef, useState } from 'react';
import { SessionStorage } from '../../common/utils';
import { getGenreIds, handleButtonClickDelay, isPageOutOfBounds } from './helpers';
import { fetchGenreIdTable, fetchMediaArray, fetchSingleMedia, fetchWeather } from './service';

export default function useMedia() {
  const genreIdTableRef = useRef(null);
  const userLocalWeatherRef = useRef(null);
  const genreIdArrayRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClickDisabled, setIsButtonClickDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const [currentLoadedMedia, setCurrentLoadedMedia] = useState({
    mediaArray: [],
    page: 1,
    totalPages: null,
    totalResults: null,
  });

  const [highlightedMedia, setHighlightedMedia] = useState({
    id: null,
    title: '',
    language: '',
    year: '',
    overview: '',
    backdropPath: '',
    genres: '',
    embedKey: '',
  });

  function handlePageChange(pageNumber) {
    if (!isPageOutOfBounds(pageNumber, currentLoadedMedia.totalPages) && !isButtonClickDisabled) {
      setCurrentPage(pageNumber);
      setIsButtonClickDisabled(true);
      handleButtonClickDelay(setIsButtonClickDisabled);
    }
  }

  function handleSelectMedia(mediaId) {
    if (!isButtonClickDisabled) {
      setHighlightedMedia(
        currentLoadedMedia.mediaArray.find((mediaItem) => mediaItem.id === mediaId),
      );
      setIsButtonClickDisabled(true);
      handleButtonClickDelay(setIsButtonClickDisabled);
    }
  }

  function handleShuffleMediaSelection() {
    SessionStorage.clearStorage();
    window.location.reload();
  }

  const handleSetErrorMessage = (message) => setErrorMessage(message);

  useEffect(() => {
    async function initializeMediaData() {
      try {
        // on initial component load or page change
        if (currentLoadedMedia.totalResults === null || currentLoadedMedia.page !== currentPage) {
          setIsLoading(true);
          if (
            [genreIdTableRef.current, userLocalWeatherRef.current, genreIdArrayRef.current].some(
              (element) => element === null,
            )
          ) {
            const table = await fetchGenreIdTable();
            genreIdTableRef.current = table;

            const { weather } = await fetchWeather();
            userLocalWeatherRef.current = weather;

            const genreIdArray = getGenreIds(userLocalWeatherRef.current, genreIdTableRef.current);
            genreIdArrayRef.current = genreIdArray;
          }

          const { page, totalPages, totalResults, media } = await fetchMediaArray(
            genreIdArrayRef.current,
            currentLoadedMedia.page !== currentPage ? currentPage : undefined,
          );

          setCurrentLoadedMedia({
            mediaArray: media,
            page,
            totalPages,
            totalResults,
          });

          setHighlightedMedia(media[0]);
          setIsLoading(false);
          // on media select
        } else {
          const response = await fetchSingleMedia(highlightedMedia.id);
          setHighlightedMedia({ ...highlightedMedia, embedKey: response.trailerUrlKey });
        }
      } catch (err) {
        handleSetErrorMessage(err.message);
      }
    }
    initializeMediaData();
  }, [highlightedMedia.id, currentPage]);

  return {
    currentLoadedMedia,
    highlightedMedia,
    handlePageChange,
    handleSelectMedia,
    handleShuffleMediaSelection,
    errorMessage,
    setErrorMessage,
    isButtonClickDisabled,
    isLoading,
  };
}
