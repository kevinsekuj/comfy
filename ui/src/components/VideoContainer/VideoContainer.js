import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { IFRAME_STYLES, VIDEO_WRAPPER_STYLES } from './VideoContainer.style';

export default function VideoContainer({ youtubeEmbedKey }) {
  return (
    <Box id='video-wrapper' sx={VIDEO_WRAPPER_STYLES}>
      <iframe
        title='vid'
        src={`https://www.youtube.com/embed/${youtubeEmbedKey}`}
        allowFullScreen
        style={IFRAME_STYLES}
      />
    </Box>
  );
}

VideoContainer.propTypes = {
  youtubeEmbedKey: PropTypes.string,
};

VideoContainer.defaultProps = {
  youtubeEmbedKey: undefined,
};
