import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useGlobalContext } from '../context';

const CustomSnackbar = () => {
  const { snackbar, closeSnackbar } = useGlobalContext();

  const { open, message, severity } = snackbar;

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={closeSnackbar}>
      <Alert onClose={closeSnackbar} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
