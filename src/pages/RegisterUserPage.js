import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useGlobalContext } from '../context';
import { Link, useNavigate } from 'react-router-dom';

const RegisterUserPage = () => {
  const { registerUser, user, token, loading } = useGlobalContext();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        console.log(user, token);
        navigate('/dashboard/projects/current');
      }, 2000);
    }
  }, [user, token, navigate]);

  useEffect(() => {
    document.title = 'Register - Project Manager';
  }, []);

  const handleNameChange = (e) => {
    e.preventDefault();
    console.log(email);
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    console.log(email);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser(name, email, password);
  };

  return (
    <Container maxWidth={false} sx={{ width: '100%', height: '100vh', backgroundImage: `url()`, backgroundColor: '#eee' }}>
      <Box display={'flex'} justifyContent={'center'} flexDirection='column' alignItems='center' width={'100%'} height={'100%'}>
        <Box maxWidth={'md'} width='100%' sx={{ backdropFilter: 'blur(3px)', mb: 4 }}>
          <Paper component={'form'} sx={{ p: 4 }} onSubmit={handleSubmit}>
            <Typography variant={'h4'} gutterBottom>
              Sign-up Form
            </Typography>

            <TextField fullWidth type='text' id='txtName' label={'Name'} placeholder={'Karan Kumar'} margin='normal' color='customBlack' onChange={handleNameChange} />

            <TextField fullWidth type='email' id='txtEmail' label={'Email'} placeholder={'abc@example.com'} margin='normal' color='customBlack' onChange={handleEmailChange} />

            <TextField fullWidth type='password' id='txtPassword' label={'Password'} placeholder={'Password'} margin='normal' color='customBlack' onChange={handlePasswordChange} />

            <LoadingButton loading={loading} variant='contained' size='large' color='primary' type='submit' sx={{ mt: 2 }}>
              Sign up
            </LoadingButton>
          </Paper>
        </Box>

        <Typography paragraph align='center'>
          Already a user? <Link to='/auth/login'>Sign In</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterUserPage;
