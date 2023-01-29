export default {
  getCardStyles(posterUrl) {
    return {
      color: 'white',
      backgroundColor: 'rgba(50, 50, 50, 0.2)',
      backgroundImage: {
        xs: `linear-gradient(
          rgba(0, 0, 0, 0.7),
          rgba(0, 0, 0, 0.7)
        ),url(${posterUrl})`,
        md: 'none',
      },
      backgroundSize: { xs: 'cover', md: 'none' },
      backgroundPosition: { xs: 'center', md: 'none' },
      flexShrink: { xs: 0, lg: 'none' },
      width: { xs: '50%', sm: '30%', lg: '100%' },
      marginRight: { xs: '.5%', md: '0' },
    };
  },
  cardContent: {
    display: 'flex',
    justifyContent: { xs: 'center', lg: 'flex-start' },
  },
  cardActionArea: {
    height: '100%',
  },
  cardMedia: {
    width: 100,
    display: { xs: 'none', md: 'block' },
  },
  cardInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: {
      xs: '3%',
      xl: '4%',
    },
  },
  mediaInfo: {
    typography: { xs: 'subtitle2', md: 'subtitle1' },
  },
  circularProgressBar: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularProgressBarWrapper: {
    position: 'relative',
    display: 'inline-flex',
  },
  mediaTitle: { typography: { xs: 'body2', lg: 'h6', xl: 'h5' } },
};
