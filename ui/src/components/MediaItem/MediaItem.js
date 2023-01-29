import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import PropTypes, { arrayOf } from 'prop-types';
import { FALLBACK_POSTER_URL, POSTER_PATH_PREFIX } from '../../common/constants';
import style from './MediaItem.style';

const MOBILE_LARGE_VIEWPORT_MEDIA_QUERY = '(min-width:426px)';
const LAPTOP_1200PX_VIEWPORT_MEDIA_QUERY = '(min-width:1200px)';

const YEAR_DELIMITER = '-';

export default function MediaItem({ posterPath, title, year, genres, voteAverage, onClick }) {
  const isLargerThanMobileLarge = useMediaQuery(MOBILE_LARGE_VIEWPORT_MEDIA_QUERY);
  const isLargerThan1200px = useMediaQuery(LAPTOP_1200PX_VIEWPORT_MEDIA_QUERY);

  const processedGenres = genres.slice(0, 3).join(', ');

  const posterUrl = posterPath ? `${POSTER_PATH_PREFIX}${posterPath}` : FALLBACK_POSTER_URL;
  return (
    <>
      <Card sx={style.getCardStyles(posterUrl)}>
        <CardActionArea sx={style.cardActionArea} onClick={onClick}>
          <CardContent sx={style.cardContent}>
            <CardMedia
              component='img'
              sx={style.cardMedia}
              image={posterUrl}
              alt={`${title} poster`}
            />
            <Box id='card-info-container' sx={style.cardInfoContainer}>
              <Box direction='row'>
                <Typography sx={style.mediaTitle}>
                  {title} {year && `(${year?.split(YEAR_DELIMITER)[0]})`}
                </Typography>
              </Box>
              <Stack direction='column' spacing={2.5} alignContent='center' marginTop='1%'>
                {isLargerThanMobileLarge ? (
                  <Typography color='common.white' sx={style.mediaInfo}>
                    {processedGenres}
                  </Typography>
                ) : (
                  <Stack>
                    <Typography color='text.white' variant='subtitle2'>
                      {processedGenres}
                    </Typography>
                  </Stack>
                )}
                <Box display='flex' alignItems='center'>
                  {voteAverage ? (
                    <>
                      <CircularProgressWithLabel value={voteAverage} />
                      <Typography variant='subtitle1' color='common.white' ml='4%' textAlign='left'>
                        User
                        <br />
                        Score
                      </Typography>
                    </>
                  ) : (
                    <Typography>No Rating</Typography>
                  )}
                </Box>
              </Stack>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      {isLargerThan1200px ? <Divider /> : <Divider orientation='vertical' />}
    </>
  );
}

function CircularProgressWithLabel({ value }) {
  return (
    <Box sx={style.circularProgressBarWrapper}>
      <>
        <CircularProgress variant='determinate' value={value} size='3.5rem' color='success' />
        <Box sx={style.circularProgressBar}>
          <Typography variant='subtitle1'>{value}</Typography>
        </Box>
      </>
    </Box>
  );
}

MediaItem.propTypes = {
  posterPath: PropTypes.string,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  genres: arrayOf(PropTypes.string).isRequired,
  voteAverage: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

MediaItem.defaultProps = {
  posterPath: FALLBACK_POSTER_URL,
  voteAverage: undefined,
};

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number,
};

CircularProgressWithLabel.defaultProps = {
  value: undefined,
};
