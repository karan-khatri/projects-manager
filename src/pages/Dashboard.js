import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

import EditProjectDialog from '../components/EditProjectDialog';
import CustomSnackbar from '../components/CustomSnackbar';

const Dashboard = () => {
  return (
    <>
      <Container maxWidth='lg'>
        <Outlet />
        <EditProjectDialog />
        <CustomSnackbar />
      </Container>
    </>
  );
};

export default Dashboard;
