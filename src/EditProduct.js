/* eslint-disable prefer-destructuring */
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

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useHistory, useParams } from 'react-router-dom';
import back from './Pic1.jpg';

import { configapp, storage } from './firebase';
import ResponsiveDrawer from './admindashborad';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function AddEditProduct() {
  React.useEffect(() => {
    const unsubscribe = configapp
      .database()
      .ref(`${id}/${keys}`)

      .on('value', (user) => {
        SetData({
          Quantity: user.val().Quantity,
          Company: user.val().Company,
          Title: user.val().Title,
          Cost: user.val().Cost,
          Dtime: user.val().Expiredate,
          images: '',
          imgSrc: user.val().Image
        });
      });

    return () => {
      unsubscribe();
    };
  });
  const [fFields, setFields] = React.useState({
    Quantity: '',
    Company: '',
    Title: '',
    Cost: '',
    Dtime: '',
    images: '',
    imgSrc: ''
  });
  const { id } = useParams();
  const [error, seterror] = React.useState({
    Quantity: '',
    Company: '',
    Title: '',
    Cost: '',
    Dtime: '',
    images: ''
  });

  const Company = React.useRef();
  const Quantity = React.useRef();
  const Title = React.useRef();
  const Cost = React.useRef();
  const Dtime = React.useRef();

  const his = useHistory();

  const [loading, setloading] = React.useState(false);
  const setform = (e) => {
    const { name, value } = e.target;
    if (e.target.name === 'images') {
      const img = e.target.files[0];
      setFields({ ...fFields, [name]: img });

      const reader = new FileReader();
      const url = reader.readAsDataURL(img);
      reader.onloadend = function () {
        setFields((pre) => ({ ...pre, imgSrc: [reader.result] }));
      };
    } else {
      setFields({ ...fFields, [name]: value });
    }
    if (name === 'Company') {
      if (value.trim().length < 1) {
        Company.current.style.color = 'red';
        seterror({ ...error, Company: 'Company name must not be empty' });
      } else {
        Company.current.style.color = 'green';
        seterror({ ...error, Company: '' });
      }
    } else if (name === 'Title') {
      if (value.trim().length < 1) {
        Title.current.style.color = 'red';
        seterror({ ...error, Title: 'Title must not be empty' });
      } else if (value.trim().length < 4) {
        Title.current.style.color = 'red';
        seterror({ ...error, Title: 'Title must be 4 charcter long' });
      } else {
        Title.current.style.color = 'green';
        seterror({ ...error, Title: '' });
      }
    } else if (name === 'Quantity') {
      if (value < 1) {
        Quantity.current.style.color = 'red';

        seterror({ ...error, Quantity: 'Quantity must be greater then 0' });
      } else {
        Quantity.current.style.color = 'green';

        seterror({ ...error, Quantity: '' });
      }
    } else if (name === 'Cost') {
      if (value < 1) {
        Cost.current.style.color = 'red';

        seterror({ ...error, Cost: 'Cost must be greater then 0' });
      } else {
        Cost.current.style.color = 'green';

        seterror({ ...error, Cost: '' });
      }
    } else if (name === 'Dtime') {
      if (Date.parse(value) <= Date.now()) {
        Quantity.current.style.color = 'red';

        seterror({
          ...error,
          Dtime: 'Past date cannot be select as a expire Date'
        });
      } else {
        Dtime.current.style.color = 'green';

        seterror({ ...error, Dtime: '' });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setloading(true);
    if (fFields.images?.name) {
      const ref = storage.ref(`/images/${fFields.images.name}`);
      const uploadTask = ref.put(fFields.images);
      uploadTask.on('state_changed', console.log, console.error, () => {
        ref
          .getDownloadURL()
          .then((url) => {
            configapp.database().ref(`${id}/${keys}`).update({
              Quantity: fFields.Quantity,
              Company: fFields.Company,
              Title: fFields.Title,
              Cost: fFields.Cost,
              Expiredate: fFields.Dtime,
              Image: url
            });
            notify('Your Product is Updated');
            his.goBack();
          })
          .catch((e) => notify(e.message));
      });
    } else {
      configapp.database().ref(`${id}/${keys}`).update({
        Quantity: fFields.Quantity,
        Company: fFields.Company,
        Title: fFields.Title,
        Cost: fFields.Cost,
        Expiredate: fFields.Dtime,
        Image: imgSrc
      });
      notify('Your Product is Updated');
      his.goBack();
    }
  };
  const notify = (error) =>
    toast(error, { position: 'top-left', type: 'error' });

  return (
    <ResponsiveDrawer>
      <Wrapper>
        <div
          style={{
            margin: '7px 0',
            display: 'flex',
            height: '100%',
            alignItems: 'center'
          }}
        >
          <Paper elevation={5}>
            <Container component="main" maxWidth="md">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <ShoppingBasketIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add Product
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    inputRef={Company}
                    helperText={error.Company}
                    error={error.Company}
                    required
                    fullWidth
                    value={fFields.Company}
                    id="Company"
                    label="Company Title"
                    name="Company"
                    autoComplete="Company"
                    autoFocus
                    onChange={setform}
                  />
                  <TextField
                    inputRef={Title}
                    helperText={error.Title}
                    error={error.Title}
                    margin="normal"
                    required
                    fullWidth
                    value={fFields.Title}
                    name="Title"
                    label="Title"
                    type="text"
                    id="Title"
                    onChange={setform}
                  />
                  <TextField
                    inputRef={Quantity}
                    helperText={error.Quantity}
                    error={error.Quantity}
                    margin="normal"
                    required
                    fullWidth
                    value={fFields.Quantity}
                    name="Quantity"
                    label="Quantity"
                    type="number"
                    id="Quantity"
                    onChange={setform}
                    autoComplete="current-Quantity"
                  />
                  <TextField
                    inputRef={Cost}
                    helperText={error.Cost}
                    error={error.Cost}
                    margin="normal"
                    required
                    fullWidth
                    value={fFields.Cost}
                    name="Cost"
                    label="Cost"
                    type="number"
                    id="Cost"
                    onChange={setform}
                    autoComplete="current-Quantity"
                  />
                  <TextField
                    inputRef={Dtime}
                    helperText={error.Dtime}
                    error={error.Dtime}
                    margin="normal"
                    required
                    fullWidth
                    value={fFields.Dtime}
                    name="Dtime"
                    type="Date"
                    id="Dtime"
                    min={new Date(Date.now())}
                    onChange={setform}
                    autoComplete="current-Quantity"
                  />
                  <TextField
                    helperText={error.images}
                    error={error.images}
                    margin="normal"
                    required
                    fullWidth
                    name="images"
                    type="file"
                    id="images"
                    onChange={setform}
                    autoComplete="current-Quantity"
                  />
                  <img src={fFields.imgSrc} height={50} width={100} alt="" />

                  {/* <CircularProgress size={10} /> */}
                  <Button
                    type="submit"
                    disabled={
                      loading ||
                      !fFields.Quantity ||
                      error.Quantity ||
                      !fFields.Company ||
                      error.Company ||
                      !fFields.Title ||
                      error.Title ||
                      !fFields.Cost ||
                      error.Cost ||
                      !fFields.Dtime ||
                      error.Dtime
                    }
                    fullWidth
                    variant="contained"
                  >
                    Add Product
                  </Button>
                </Box>
              </Box>
            </Container>
          </Paper>
        </div>
      </Wrapper>
    </ResponsiveDrawer>
  );
}
