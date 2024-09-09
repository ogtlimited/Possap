import type { FC } from 'react';
import type { ISignupStepOneFormProps } from 'src/models/auth.interface';

import React from 'react';
import * as Yup from 'yup';
import { Form, Field, Formik } from 'formik';

import {
  Box,
  Link,
  Radio,
  Button,
  Select,
  MenuItem,
  TextField,
  FormLabel,
  RadioGroup,
  Typography,
  InputLabel,
  FormControl,
  FormControlLabel,
} from '@mui/material';


// Validation schema
const validationSchema = Yup.object().shape({
  taxPayerType: Yup.string().required('Taxpayer type is required'),
  idType: Yup.string().required('Identification type is required'),
  idNumber: Yup.string().required('Identification number is required'),
});

export const SignupStepOneForm: FC<ISignupStepOneFormProps> = ({initialData, onProceed}) => {
  console.log('signup');
  return (
    <Box>
      <Formik
        initialValues={{
          taxPayerType: initialData.taxPayerType,
          idType: initialData.idType,
          idNumber: initialData.idNumber,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form Data', values);
          onProceed(values)
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box mt={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Who are you?</FormLabel>
                <RadioGroup row name="taxPayerType" style={{ justifyContent: 'center' }}>
                  <FormControlLabel
                    value="1"
                    control={<Field as={Radio} name="taxPayerType" />}
                    label="Individual"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Field as={Radio} name="taxPayerType" />}
                    label="Corporate/NGOs"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Field as={Radio} name="taxPayerType" />}
                    label="MDAs"
                  />
                </RadioGroup>
                {touched.taxPayerType && errors.taxPayerType && (
                  <Typography color="error">{errors.taxPayerType}</Typography>
                )}
              </FormControl>
            </Box>

            <Box mt={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="idTypeLabel">Identification Type</InputLabel>
                <Field
                  as={Select}
                  name="idType"
                  labelId="idTypeLabel"
                  label="Identification Type"
                  error={touched.idType && Boolean(errors.idType)}
                >
                  <MenuItem value="">
                    <em>Select an Identification Type</em>
                  </MenuItem>
                  <MenuItem value="1">National Identification Number</MenuItem>
                  <MenuItem value="4">Bank Verification Number</MenuItem>
                </Field>
                {touched.idType && errors.idType && (
                  <Typography color="error">{errors.idType}</Typography>
                )}
              </FormControl>
            </Box>

            <Box mt={2}>
              <Field
                as={TextField}
                fullWidth
                name="idNumber"
                label="Identification Number"
                variant="outlined"
                error={touched.idNumber && Boolean(errors.idNumber)}
                helperText={touched.idNumber && errors.idNumber}
              />
            </Box>

            <Box mt={3}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Proceed
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Already have an account? <Link href="/sign-in">Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};
