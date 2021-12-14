/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
  JSON.stringifylocalStorage.getItem(currentUser);
  const check = localStorage.getItem('token');
  return (
    <Route
      {...props}
      render={() => (check ? <Component /> : <Redirect to="/" />)}
    />
  );
};

export default PrivateRoute;
