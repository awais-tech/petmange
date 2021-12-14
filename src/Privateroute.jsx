/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
  const check = localStorage.getItem('tokenss');

  return (
    <Route
      {...props}
      render={() => (check === 'true' ? <Component /> : <Redirect to="/" />)}
    />
  );
};

export default PrivateRoute;
