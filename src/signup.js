/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import firebase from 'firebase/compat/app';
import Container from '@mui/material/Container';
import { CircularProgress, Paper } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { makeStyles } from '@mui/styles';
import back from './Pic1.jpg';

import { configapp } from './firebase';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('${back}');

  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex ',
//     justifyContent: 'center ',
//     alignItems: 'center ',
//     height: '100vh',
//     flexDirection: 'column'
//   },
//   child: {
//     width: '45%'
//   },
//   multilineColor: {
//     color: 'green'
//   }
// }));
export default function Signup() {
  const [fFields, setFields] = React.useState({
    password: '',
    email: '',
    name: ''
  });
  const [error, seterror] = React.useState({
    password: '',
    email: '',
    name: '',

    cpassword: ''
  });
  const [cpassword, setcpassword] = React.useState('');
  const email = React.useRef();
  const password = React.useRef();
  const names = React.useRef();

  const cassword = React.useRef();
  const [loading, setloading] = React.useState(false);
  const setform = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name !== 'cpassword') {
      setFields({ ...fFields, [name]: value });
    } else {
      setcpassword(value);
    }
    if (name === 'password') {
      if (value !== cassword.current.value) {
        setcpassword('');
      }

      if (value.trim().length < 1) {
        seterror({ ...error, password: 'field must not be empty' });
      } else if (value.trim().length < 6) {
        seterror({ ...error, password: 'field must  be 6 character long' });
      } else {
        seterror({ ...error, password: '' });
      }
    } else if (name === 'email') {
      if (value.trim().length < 1) {
        email.current.style.color = 'red';
        seterror({ ...error, email: 'email must not be empty' });
      } else if (!value.trim().includes('@')) {
        email.current.style.color = 'red';
        seterror({ ...error, email: 'Invalid email' });
      } else {
        email.current.style.color = 'green';
        seterror({ ...error, email: '' });
      }
    } else if (name === 'name') {
      if (value.trim().length < 1) {
        names.current.style.color = 'red';
        seterror({ ...error, name: 'name must not be empty' });
      } else if (value.trim() < 4) {
        names.current.style.color = 'red';
        seterror({ ...error, name: 'name must be 4 charcter long' });
      } else {
        names.current.style.color = 'green';
        seterror({ ...error, name: '' });
      }
    } else if (name === 'cpassword') {
      if (value !== password.current.value) {
        cassword.current.style.color = 'red';

        seterror({ ...error, cpassword: 'Password did not match' });
      } else {
        cassword.current.style.color = 'green';

        seterror({ ...error, cpassword: '' });
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    setloading(true);
    configapp
      .auth()
      .createUserWithEmailAndPassword(fFields.email, fFields.password)
      .then((e) => {
        configapp
          .database()
          .ref(`Admin/${e.user.uid}`)
          .update({
            Password: fFields.password,
            email: fFields.email,
            name: fFields.name,
            uid: e.user.uid
          })
          .then((e) => {
            notify('Your account is created You can log in now');
          })
          .catch((e) => notify(e.message));
      })
      .catch((e) => {
        notify(e.message);
      })
      .finally(() => {
        setloading(false);
      });
  };
  const notify = (error) =>
    toast(error, { position: 'top-left', type: 'error' });

  return (
    <Wrapper>
      <div
        style={{
          margin: '7px 0',
          display: 'flex',
          height: '80%',
          alignItems: 'center'
        }}
      >
        <Paper elevation={5}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  inputRef={email}
                  helperText={error.email}
                  error={error.email}
                  required
                  fullWidth
                  value={fFields.email}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={setform}
                />
                <TextField
                  inputRef={names}
                  helperText={error.name}
                  error={error.name}
                  margin="normal"
                  required
                  fullWidth
                  value={fFields.name}
                  name="name"
                  label="Name"
                  type="text"
                  id="Name"
                  onChange={setform}
                />
                <TextField
                  inputRef={password}
                  helperText={error.password}
                  error={error.password}
                  margin="normal"
                  required
                  fullWidth
                  value={fFields.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={setform}
                  autoComplete="current-password"
                />
                <TextField
                  inputRef={cassword}
                  helperText={error.cpassword}
                  error={error.cpassword}
                  margin="normal"
                  required
                  fullWidth
                  value={cpassword}
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirm password"
                  onChange={setform}
                  autoComplete="current-password"
                />
                {/* <CircularProgress size={10} /> */}
                <Button
                  type="submit"
                  disabled={
                    loading ||
                    !fFields.password ||
                    error.password ||
                    !fFields.email ||
                    error.email ||
                    !fFields.name ||
                    error.name ||
                    !cpassword ||
                    error.cpassword
                  }
                  fullWidth
                  variant="contained"
                >
                  Sign up
                </Button>

                <Link href="/" variant="body2">
                  Have an account? Sign In
                </Link>
              </Box>
            </Box>
            <Copyright sx={{ mt: 3, mb: 2 }} />
          </Container>
        </Paper>
      </div>
    </Wrapper>
  );
}
