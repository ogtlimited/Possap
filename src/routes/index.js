import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
import ServiceGuard from '../guards/ServiceGuard';
import { ServiceFormProvider } from '../contexts/FormContext';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <RoleBasedGuard>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <GeneralApp /> },
        { path: 'reports', element: <Reports /> },
        {
          path: 'reports',
          children: [
            { path: '/', element: <Navigate to="/dashboard/reports/police-extract" replace /> },
            { path: 'police-extract', element: <Reports /> },
            { path: 'character-certificate', element: <Reports /> },
            { path: 'guard-services', element: <Reports /> }
          ]
        },
        {
          path: 'user',
          children: [
            { path: '/', element: <Navigate to="/dashboard/user/profile" replace /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <CreateUser /> }
          ]
        },
        {
          path: 'requests',
          children: [
            { path: '/', element: <Navigate to="/dashboard/requests/police-extract" replace /> },
            { path: 'police-extract', element: <Extract /> },
            { path: 'character-certificate', element: <CharacterCert /> },
            { path: 'guard-services', element: <EGServices /> },
            { path: 'approval/:id', element: <Approval /> }
          ]
        }
      ]
    },
    {
      path: 'user-dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="/user-dashboard/app" replace /> },
        { path: 'app', element: <UserApp /> }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <LandingPage /> },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        {
          path: 'services',
          element: (
            <ServiceGuard>
              <ServiceFormProvider>
                <Services />
              </ServiceFormProvider>
            </ServiceGuard>
          )
        },
        {
          path: 'services/invoice/:id',
          element: (
            <ServiceGuard>
              <ServiceFormProvider>
                <Invoice />
              </ServiceFormProvider>
            </ServiceGuard>
          )
        }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));

// Dashboard
const Services = Loadable(lazy(() => import('../pages/Services')));
const Invoice = Loadable(lazy(() => import('../pages/Invoice')));

// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const UserApp = Loadable(lazy(() => import('../pages/dashboard/UserApp')));
const Reports = Loadable(lazy(() => import('../pages/dashboard/Reports')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const CreateUser = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));
const Extract = Loadable(lazy(() => import('../pages/dashboard/Extract')));
const CharacterCert = Loadable(lazy(() => import('../pages/dashboard/CharacterCert')));
const EGServices = Loadable(lazy(() => import('../pages/dashboard/EGServices')));
const Approval = Loadable(lazy(() => import('../pages/dashboard/Approval')));

// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
