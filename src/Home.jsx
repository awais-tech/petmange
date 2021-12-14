/* eslint-disable no-unused-expressions */
import * as React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Box from '@mui/material/Box';
import { Grid, CircularProgress } from '@mui/material';
import ResponsiveDrawer from './admindashborad';
import Accessories from './Accesories';

import { configapp } from './firebase';

const Home = () => {
  const [vaccines, setvaccines] = React.useState(0);
  const [foods, setFoods] = React.useState(0);

  const [accessories, setAccessories] = React.useState(0);
  const [orders, setOrders] = React.useState(0);
  const [users, setUsers] = React.useState(0);
  const [doctors, setDoctors] = React.useState(0);
  const [loading, setLoading] = React.useState(0);
  React.useEffect(() => {
    setLoading(true);
    const unsubscribe = configapp
      .database()
      .ref(`Accessories`)

      .on('value', (user) => {
        const a = [];
        user.forEach((doc) => {
          a.push({ ...doc.val(), id: doc.key });
        });

        setAccessories(a.length);
      });

    configapp
      .database()
      .ref(`Food`)

      .on('value', (user) => {
        const a = [];
        user.forEach((doc) => {
          a.push({ ...doc.val(), id: doc.key });
        });
        setFoods(a.length);
        configapp
          .database()
          .ref(`Vaccines`)

          .on('value', (user) => {
            const a = [];
            user.forEach((doc) => {
              a.push({ ...doc.val(), id: doc.key });
            });
            setvaccines(a.length);
          });
        configapp
          .database()
          .ref(`Users`)

          .on('value', (user) => {
            const a = [];
            const b = [];
            user.forEach((doc) => {
              doc.val().userType === 'user'
                ? a.push({ ...doc.val(), id: doc.key })
                : b.push({ ...doc.val(), id: doc.key });
            });
            setUsers(a.length);
            setDoctors(b.length);
          });
        configapp
          .database()
          .ref(`Orders`)

          .on('value', (user) => {
            const a = [];
            user.forEach((doc) => {
              a.push({ ...doc.val(), id: doc.key });
            });
            setOrders(a.length);
            setLoading(false);
          });
      });
  }, []);
  return (
    <ResponsiveDrawer>
      {!loading ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 1,
                  p: 2,
                  minWidth: 300
                }}
              >
                <Box sx={{ color: 'text.secondary' }}>Accessories</Box>
                <Box
                  sx={{
                    color: 'text.primary',
                    fontSize: 34,
                    fontWeight: 'medium'
                  }}
                >
                  {accessories}
                </Box>
                <Box
                  component={TrendingUpIcon}
                  sx={{
                    color: 'success.dark',
                    fontSize: 16,
                    verticalAlign: 'sub'
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 1,
                  p: 2,
                  minWidth: 300
                }}
              >
                <Box sx={{ color: 'text.secondary' }}>Foods</Box>
                <Box
                  sx={{
                    color: 'text.primary',
                    fontSize: 34,
                    fontWeight: 'medium'
                  }}
                >
                  {foods}
                </Box>
                <Box
                  component={TrendingUpIcon}
                  sx={{
                    color: 'success.dark',
                    fontSize: 16,
                    verticalAlign: 'sub'
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 1,
                  p: 2,
                  minWidth: 300
                }}
              >
                <Box sx={{ color: 'text.secondary' }}>Registered Users</Box>
                <Box
                  sx={{
                    color: 'text.primary',
                    fontSize: 34,
                    fontWeight: 'medium'
                  }}
                >
                  {users}
                </Box>
                <Box
                  component={TrendingUpIcon}
                  sx={{
                    color: 'success.dark',
                    fontSize: 16,
                    verticalAlign: 'sub'
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 1,
                  p: 2,
                  minWidth: 300
                }}
              >
                <Box sx={{ color: 'text.secondary' }}>Registered Doctors</Box>
                <Box
                  sx={{
                    color: 'text.primary',
                    fontSize: 34,
                    fontWeight: 'medium'
                  }}
                >
                  {doctors}
                </Box>
                <Box
                  component={TrendingUpIcon}
                  sx={{
                    color: 'success.dark',
                    fontSize: 16,
                    verticalAlign: 'sub'
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 1,
                  p: 2,
                  minWidth: 300
                }}
              >
                <Box sx={{ color: 'text.secondary' }}>Vaccines</Box>
                <Box
                  sx={{
                    color: 'text.primary',
                    fontSize: 34,
                    fontWeight: 'medium'
                  }}
                >
                  {vaccines}
                </Box>
                <Box
                  component={TrendingUpIcon}
                  sx={{
                    color: 'success.dark',
                    fontSize: 16,
                    verticalAlign: 'sub'
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 1,
                  p: 2,
                  minWidth: 300
                }}
              >
                <Box sx={{ color: 'text.secondary' }}>Orders</Box>
                <Box
                  sx={{
                    color: 'text.primary',
                    fontSize: 34,
                    fontWeight: 'medium'
                  }}
                >
                  {orders}
                </Box>
                <Box
                  component={TrendingUpIcon}
                  sx={{
                    color: 'success.dark',
                    fontSize: 16,
                    verticalAlign: 'sub'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh'
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      )}
    </ResponsiveDrawer>
  );
};

export default Home;
