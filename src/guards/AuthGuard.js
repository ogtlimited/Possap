import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// hooks
import useAuth from '../hooks/useAuth';
// pages
import Login from '../pages/authentication/Login';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isAuthenticated) {
    console.log(pathname, requestedLocation);
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    console.log('NOT AUTH');
    return <Login />;
  }
  console.log(requestedLocation);
  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    console.log(requestedLocation);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
