import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useContext(AuthContext);

  return user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
