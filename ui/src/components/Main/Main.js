import { Box, Chip, CircularProgress, Pagination, Paper, Tooltip, Typography } from '@mui/material';
import ErrorView from '../../common/components/ErrorView';
import { DEFAULT_PAGINATION_COUNT_FALLBACK, FALLBACK_BACKDROP_URL } from '../../common/constants';
import MediaItem from '../MediaItem/MediaItem';
import VideoContainer from '../VideoContainer/VideoContainer';
import style from './Main.style';
import useMedia from './useMedia';

export default function Main() {
  const {
    currentLoadedMedia,
    highlightedMedia,
    errorMessage,
    setErrorMessage,
    handlePageChange,
    handleSelectMedia,
    handleShuffleMediaSelection,
    isButtonClickDisabled,
    isLoading,
    currentPage,
  } = useMedia();

  return (
    <Box
      id='backdrop-container'
      style={style.setBackdropImage(
        highlightedMedia.backdropPath ?? FALLBACK_BACKDROP_URL,
        !!highlightedMedia.backdropPath,
      )}
    >
      {errorMessage && (
        <ErrorView errorMessageHandler={setErrorMessage} errorMessage={errorMessage} />
      )}

      {!errorMessage && (
        <Box id='main-container' sx={style.mainContainer}>
          {isLoading ? (
            <Box sx={{ margin: 'auto', textAlign: 'center' }}>
              <CircularProgress color='secondary' />
              <Typography>Loading recommendations</Typography>
            </Box>
          ) : (
            <>
              <Box theme id='media-content-container' sx={style.mediaContainer}>
                <Box id='video-container' sx={style.videoContainer}>
                  <VideoContainer youtubeEmbedKey={highlightedMedia.embedKey} />
                </Box>
                {highlightedMedia.id && (
                  <Paper id='overview-container' sx={style.overviewContainer}>
                    <Typography sx={style.typography}>
                      <strong>
                        {' '}
                        {highlightedMedia.title} | {highlightedMedia.year} | (
                        {highlightedMedia.language?.toLocaleUpperCase()}) <br />
                      </strong>

                      {highlightedMedia.overview}
                      <br />
                    </Typography>
                  </Paper>
                )}
              </Box>
              <Box id='media-list-container' sx={style.mediaListContainer}>
                <Box id='media-list' sx={style.mediaList}>
                  {currentLoadedMedia.mediaArray &&
                    currentLoadedMedia.mediaArray.map(
                      ({ id, posterPath, title, year, genreIDs, voteAverage }) => (
                        <MediaItem
                          key={id}
                          posterPath={posterPath}
                          title={title}
                          year={year}
                          // eslint-disable-next-line no-unused-vars
                          genres={genreIDs.map(([genre, _]) => genre)}
                          voteAverage={voteAverage * 10}
                          onClick={() => handleSelectMedia(id)}
                        />
                      ),
                    )}
                </Box>

                <Box id='pagination-container' display='flex' justifyContent='center'>
                  <Pagination
                    page={currentPage ?? 1}
                    count={currentLoadedMedia.totalPages ?? DEFAULT_PAGINATION_COUNT_FALLBACK}
                    color='secondary'
                    variant='outlined'
                    sx={style.pagination}
                    onChange={(_e, value) => handlePageChange(value)}
                    disabled={isButtonClickDisabled}
                  />
                </Box>
                <Box id='chip-container' display='flex' justifyContent='center'>
                  <Tooltip title='Not interested in the current movie selection? Shuffle to get new recommendations'>
                    <Chip
                      sx={style.chip}
                      label='Shuffle'
                      color='secondary'
                      variant='outlined'
                      onClick={() => handleShuffleMediaSelection()}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
