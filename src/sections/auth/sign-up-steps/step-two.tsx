import type { FC } from 'react';
import type { ISignupStepTwoFormProps } from 'src/models/auth.interface';

import * as Yup from 'yup';
import { Form, Field, Formik } from 'formik';

import {
  Box,
  Grid,
  Link,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  TextareaAutosize,
} from '@mui/material';

// Validation schema
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  gender: Yup.string().required('Gender is required'),
  state: Yup.string().required('State is required'),
  lga: Yup.string().required('LGA is required'),
  address: Yup.string().required('Address is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const SignupStepTwoForm: FC<ISignupStepTwoFormProps> = ({initialData, onBack, onProceed}) => (
    <Box>

      <Formik
        initialValues={{
          fullName: initialData.fullName,
          phoneNumber: initialData.phoneNumber,
          email: initialData.email,
          gender: initialData.gender,
          state: initialData.state,
          lga: initialData.lga,
          address: initialData.address,
          password: initialData.password,
          confirmPassword: initialData.confirmPassword,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            console.log('Form Data', values);
            onProceed(values)
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box mt={2}>
              <Field
                as={TextField}
                fullWidth
                name="fullName"
                label="Full Name"
                variant="outlined"
                placeholder="Enter Full Name"
                error={touched.fullName && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
              />
            </Box>

            <Box mt={2}>
              <Field
                as={TextField}
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                placeholder="Enter Phone Number"
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
            </Box>

            <Box mt={2}>
              <Field
                as={TextField}
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
                placeholder="Enter Email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>

            <Box mt={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="genderLabel">Gender</InputLabel>
                <Field
                  as={Select}
                  name="gender"
                  labelId="genderLabel"
                  label="Gender"
                  error={touched.gender && Boolean(errors.gender)}
                >
                  <MenuItem value="">
                    <em>Select your gender</em>
                  </MenuItem>
                  <MenuItem value="1">Male</MenuItem>
                  <MenuItem value="2">Female</MenuItem>
                </Field>
                {touched.gender && errors.gender && (
                  <Typography color="error">{errors.gender}</Typography>
                )}
              </FormControl>
            </Box>

            <Box mt={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="stateLabel">State</InputLabel>
                <Field
                  as={Select}
                  name="state"
                  labelId="stateLabel"
                  label="State"
                  error={touched.state && Boolean(errors.state)}
                >
                  <MenuItem value="">
                    <em>Select a State</em>
                  </MenuItem>
                  <MenuItem value="1">Lagos</MenuItem>
                  <MenuItem value="2">Abia</MenuItem>
                </Field>
                {touched.state && errors.state && (
                  <Typography color="error">{errors.state}</Typography>
                )}
              </FormControl>
            </Box>

            <Box mt={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="lgaLabel">Local Government Area (LGA)</InputLabel>
                <Field
                  as={Select}
                  name="lga"
                  labelId="lgaLabel"
                  label="Local Government Area"
                  error={touched.lga && Boolean(errors.lga)}
                >
                  <MenuItem value="">
                    <em>Select an LGA</em>
                  </MenuItem>
                </Field>
                {touched.lga && errors.lga && (
                  <Typography color="error">{errors.lga}</Typography>
                )}
              </FormControl>
            </Box>

            <Box mt={2}>
              <Field
                as={TextareaAutosize}
                minRows={4}
                placeholder="Enter your address"
                name="address"
                style={{ width: '100%' }}
                error={touched.address && Boolean(errors.address)}
              />
              {touched.address && errors.address && (
                <Typography color="error">{errors.address}</Typography>
              )}
            </Box>

            <Box mt={2}>
              <Field
                as={TextField}
                fullWidth
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                placeholder="Enter Password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>

            <Box mt={2}>
              <Field
                as={TextField}
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                placeholder="Confirm Password"
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </Box>

            <Grid container spacing={2} mt={3}>
              <Grid item xs={6}>
                <Button onClick={onBack} fullWidth variant="outlined" color="primary" type="button">
                  Back
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button type="submit" fullWidth variant="contained" color="primary">
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Already have an account? <Link href="sign-in">Login</Link>
        </Typography>
      </Box>
    </Box>
  );


