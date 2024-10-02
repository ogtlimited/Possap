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

export function ForgotPasswordView() {
  const [submitted, setsubmitted] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    
  });


  return (

    <Container maxWidth="lg" style={{ marginTop: '10px' }}>
    <Box display="flex" flexDirection="column" alignItems="center">
      <img src="/assets/images/forgot.svg" alt="Logo" style={{ width: 80, height: 'auto' }} />
      <Typography variant="h5">Confirm Your Email</Typography>
      <Typography variant="body2" color="textSecondary">
      A verification code will be sent to the specified email address
      </Typography>
    </Box>
    <Formik
      initialValues={{ email: ''}}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form Data', values);
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
          <Box mt={2} textAlign="center">
      <Typography variant="body2" color="textSecondary">
         Please enter your email.
      </Typography>
    </Box>
          <Box mt={3}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              color="primary"
              variant="contained"
            >
              Proceed
            </LoadingButton>
          </Box>
        </Form>
      )}
    </Formik>
  </Container>
    
  );


}