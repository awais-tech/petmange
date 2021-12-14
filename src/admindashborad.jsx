import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Typography from '@mui/material/Typography';

import { useHistory } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import VaccinesIcon from '@mui/icons-material';
import WorkIcon from '@mui/icons-material/Work';

import MedicationIcon from '@mui/icons-material/Medication';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { configapp } from './firebase';

const drawerWidth = 240;
const ResponsiveDrawer = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const his = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [Name, setName] = useState();

  const handleClick = () => {};

  const handlePass = () => {};

  const handleFeatured = () => {};

  const handleVerified = () => {};
  const handleEdit = () => {};

  const drawer = (
    <div>
      <Toolbar />

      <List>
        {[
          [
            `Hello ${
              JSON.parse(localStorage.getItem('currentUser')).name || `Admin`
            }`
          ]
        ].map((text, index) => (
          <ListItem button key={text} onClick={() => his.push('/Admin')}>
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Home'].map((text, index) => (
          <ListItem button key={text} onClick={() => his.push('/Admin')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        {['View Users'].map((text, index) => (
          <ListItem button key={text} onClick={() => his.push('/User')}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <List>
        {['View Doctors'].map((text, index) => (
          <ListItem button key={text} onClick={() => his.push('/Doctor')}>
            <ListItemIcon>
              <MedicationIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Accessories'].map((text, index) => (
          <ListItem button key={text} onClick={() => his.push('/Accessories')}>
            <ListItemIcon>
              <ProductionQuantityLimitsIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <List>
        {['Food'].map((text, index) => (
          <ListItem button key={text} onClick={() => his.push('/Food')}>
            <ListItemIcon>
              <RestaurantMenuIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <List>
        {['Vacinies'].map((text, index) => (
          <ListItem button key={text} onClick={() => his.push('/Vaccines')}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Orders'].map((text, index) => (
          <ListItem button key={text} onClick={() => his.push('/Orders')}>
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <List>
        {['Log Out'].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              configapp.auth().signOut();
              localStorage.setItem('currentUser', '');
              localStorage.setItem('token', false);
              his.push('/');
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Toolbar />
        <div>{children}</div>
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
