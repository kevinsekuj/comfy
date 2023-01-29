import { TMDB_BACKDROP_URL_PREFIX } from '../../common/constants';

export default {
  setBackdropImage(backdropUrl, isFallback) {
    return {
      backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.7), 
              rgba(0, 0, 0, 0.7)
            ),url(${isFallback ? TMDB_BACKDROP_URL_PREFIX : ''}${backdropUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    };
  },

  mainContainer: {
    margin: '0 2%',
    height: '100%',
    display: 'flex',
    flexDirection: { xs: 'column', lg: 'row' },
    justifyContent: { lg: 'space-between' },
  },

  mediaContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: { lg: '65%', xl: '70%' },
    height: { xs: '70%', md: '80%', lg: '90%' },
    marginTop: '2%',
  },

  overviewContainer: {
    background: 'rgba(50, 50, 50, 0.2)',
    color: 'white',
    height: { xs: '35%', md: '30%' },
    marginTop: '1%',
    overflow: { xs: 'auto', lg: 'none' },
  },

  typography: {
    padding: '1%',
    typography: {
      xs: 'caption',
      sm: 'body2',
      md: 'subtitle1',
      lg: 'subtitle2',
      xl: 'h6',
    },
  },

  mediaListContainer: {
    width: { lg: '30%', xl: '25%' },
    marginTop: { xs: 0, lg: '2%' },
  },

  mediaList: {
    display: { xs: 'flex', lg: 'block' },
    width: { xs: '100%', lg: '90%' },
    justifyContent: { xs: 'flex-start', lg: 'none' },
    flexShrink: { xs: 0, lg: 'none' },
    maxHeight: { xs: '100%', lg: '90%' },
    overflow: 'auto',
  },

  pagination: { button: { color: '#ffffff' }, marginTop: '1%' },

  chip: { button: { color: '#ffffff' }, marginTop: '1%' },

  videoContainer: { height: { xs: '60%', lg: '75%' }, width: '100%' },
};
