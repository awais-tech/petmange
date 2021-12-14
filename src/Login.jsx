/* eslint-disable import/named */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useHistory } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import { CircularProgress, Paper } from '@mui/material';

import styled from 'styled-components';
import back from './Pic1.jpg';
import 'firebase/compat/firestore';
import { configapp } from './firebase';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
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
export default function Login() {
  const [fFields, setFields] = React.useState({ password: '', email: '' });
  const [error, seterror] = React.useState({ password: '', email: '' });
  const [loading, setloading] = React.useState(false);
  const email = React.useRef();
  const password = React.useRef();
  const his = useHistory();

  const setform = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFields({ ...fFields, [name]: value });
    if (name === 'password') {
      if (value.trim().length < 1) {
        seterror({ ...error, password: 'field must not be empty' });
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
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setloading(true);
    configapp
      .auth()
      .signInWithEmailAndPassword(fFields.email, fFields.password)
      .then((e) => {
        configapp
          .database()
          .ref(`Admin/${e.user.uid}`)
          .once('value', (user) => {
            if (user.val()) {
              localStorage.setItem('currentUsers', JSON.stringify(user.val()));
              localStorage.setItem('tokenss', true);
              his.push('Admin');
            } else {
              configapp.auth().signOut();
              notify('You are not registered');
            }
          })
          .catch((e) => {
            configapp.auth().signOut();
            notify('You are not registered');
          });
      })
      .catch((e) => {
        configapp.auth().signOut();
        notify('Email or Password is incorrect');
      })
      .finally(() => {
        setloading(false);
      });
  };
  const notify = (error) =>
    toast(error, { position: 'top-left', type: 'error' });
  return (
    <Wrapper>
      <Paper elevation={5} style={{ margin: '3px 0px' }}>
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
              {/* <CircularProgress size={10} /> */}
              <Button
                type="submit"
                disabled={
                  loading ||
                  !fFields.password ||
                  error.password ||
                  !fFields.email ||
                  error.email
                }
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item>
                  <Button>
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Paper>
    </Wrapper>
  );
}
