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

export function ResetPasswordView() {
  const [submitted, setsubmitted] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().min(8, 'Password must be at least 8 characters long').required('New password is required'),

    repeatPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match').required('Please confirm your new password'),
    
  });

return (
    <Container maxWidth="lg" style={{ marginTop: '10px' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5">Reset Password</Typography>
      </Box>
      <Formik
        initialValues={{  newPassword: '', repeatPassword: '' }}
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
                name="newPassword"
                type="password"
                label="New Password"
                variant="outlined"
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
              />
            </Box>
  
            <Box mt={3}>
              <Field
                as={TextField}
                fullWidth
                name="repeatPassword"
                type="password"
                label="Confirm New Password"
                variant="outlined"
                error={touched.repeatPassword && Boolean(errors.repeatPassword)}
                helperText={touched.repeatPassword && errors.repeatPassword}
              />
            </Box>
  
              <Box mt={3}>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                color="primary"
                variant="contained"
              >
                Reset
              </LoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
  


}