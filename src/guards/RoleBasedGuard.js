import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { PATH_AUTH, PATH_DASHBOARD } from '../routes/paths';
// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node
};

const useCurrentRole = () => {
  // Logic here to get current user role
  const { user } = useAuth();
  console.log(typeof user === 'undefined');
  if (typeof user === 'undefined') {
    <Navigate to={PATH_AUTH.login} />;
  }
  const role = user?.userType;
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const currentRole = useCurrentRole();

  if (currentRole !== 'Officer') {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
