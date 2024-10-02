import * as Yup from 'yup';
import React, { useState } from 'react';
import { Form, Field, Formik } from 'formik';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Link,
  Stack,
  Button,
  Checkbox,
  Container,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const SignInView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <Container maxWidth="lg" style={{ marginTop: '10px' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img src="/assets/images/PossapLogo.svg" alt="Logo" style={{ width: 80, height: 'auto' }} />
        <Typography variant="h3">Welcome</Typography>
        <Typography variant="body2" color="textSecondary">
          Enter your credentials
        </Typography>
      </Box>
      <Formik
        initialValues={{ email: '', password: '', rememberMe: false }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form Data', values);
          router.push('/');
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box mt={3}>
              <Field
                as={TextField}
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box mt={2}>
              <Field
                as={TextField}
                fullWidth
                name="password"
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} mt={2} spacing={{ xs: 1, sm: 1, md: 6 }}>
              <FormControlLabel
                control={<Field as={Checkbox} name="rememberMe" />}
                label="Remember me"
              />
              <Box pt={0.9}>
                <Link href="/retrieve-email" variant="body2">
                  Retrieve Email
                </Link>
                <span> | </span>
                <Link href="/forgot-password" variant="body2">
                  Forgot Password?
                </Link>
              </Box>
            </Stack>
            <Box mt={3}>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                color="primary"
                variant="contained"
              >
                Sign in
              </LoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
      <Box mt={2} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          Dont have an account? <Link href="/signup">Signup</Link>
        </Typography>
      </Box>
    </Container>
  );
};
