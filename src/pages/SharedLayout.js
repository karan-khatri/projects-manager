import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import { useGlobalContext } from '../context';
import { useEffect } from 'react';
import CustomSnackbar from '../components/CustomSnackbar';

const SharedLayout = () => {
  const { user, token } = useGlobalContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      navigate('/dashboard/projects/current');
    } else {
      navigate('/auth/login');
    }
  }, []); // eslint-disable-line

  return (
    <>
      <Navbar />
      <CustomSnackbar />
      <Outlet />
    </>
  );
};

export default SharedLayout;
