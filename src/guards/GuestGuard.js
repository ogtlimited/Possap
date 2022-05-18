import PropTypes from 'prop-types';
import { Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, user } = useAuth();
  const query = useLocation();
  console.log(user);
  console.log(query);
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('redirectUrl'));
  if (isAuthenticated) {
    if (searchParams.get('redirectUrl')) {
      return <Navigate to={searchParams.get('redirectUrl')} />;
    }
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
