import { Alert, Stack } from '@mui/material';
import PropTypes from 'prop-types';

export default function ErrorView({ errorMessageHandler, errorMessage }) {
  return (
    <Stack sx={{ position: 'absolute', width: '100%', zIndex: 1 }} spacing={2}>
      <Alert severity='error' onClose={() => errorMessageHandler('')}>
        {errorMessage}
      </Alert>
    </Stack>
  );
}

ErrorView.propTypes = {
  errorMessageHandler: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};
