import { useEffect } from 'react';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

import EditProjectDialog from '../components/EditProjectDialog';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard - Project Manager';
  }, []);

  return (
    <>
      <Container maxWidth='lg'>
        <Outlet />
        <EditProjectDialog />
      </Container>
    </>
  );
};

export default Dashboard;
