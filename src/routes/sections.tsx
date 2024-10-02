import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import LandingPageLayout from 'src/layouts/landing';
import { DashboardLayout } from 'src/layouts/dashboard';

import LandingPage from 'src/sections/landing/LandingPage';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const ValidateDocumentPage = lazy(() => import('src/pages/ValidateDocument'));

export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const RetrieveEmailPage = lazy(() => import('src/pages/retrieve-email'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const ForgotPassword = lazy(() => import('src/pages/forgot-password'));
export const ResetPassword = lazy(() => import('src/pages/reset-password'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const AboutPage = lazy(() => import('src/pages/about'));
export const ContactPage = lazy(() => import('src/pages/contact'));
export const OTPPage = lazy(() => import('src/pages/otp'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: <LandingPageLayout />,
      children: [
        { path: '', element: <LandingPage /> },
        { path: 'p/validate-document', element: <ValidateDocumentPage /> },
        { path: '/p/about', element: <AboutPage /> },
        { path: '/p/contact', element: <ContactPage /> },
      ],
    },
    {
      path: 'dashboard',
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'user', element: <UserPage /> },
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: 'retrieve-email',
      element: (
        <AuthLayout>
          <RetrieveEmailPage />
        </AuthLayout>
      ),
    },
    {
      path: 'otp',
      element: (
        <AuthLayout>
          <OTPPage />
        </AuthLayout>
      ),
    },
    {
      path: 'signup',
      element: (
        <AuthLayout>
          <SignUpPage />
        </AuthLayout>
      ),
    },
    {
      path: 'forgot-password',
      element: (
        <AuthLayout>
          <ForgotPassword />
        </AuthLayout>
      ),
    },
    {
      path: 'reset-password',
      element: (
        <AuthLayout>
          <ResetPassword />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
