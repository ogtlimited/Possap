/* eslint-disable prettier/prettier */
import * as Yup from 'yup';
import { useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';

import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { MotionInView, varFadeInUp } from '../../animate';
import { UploadSingleFile } from '../../upload';
// hooks

import { IDENTIFICATIONTYPE } from '../../../constants/register-constants';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

export default function RegisterOneForm({ setcurrentStep, formSubmit }) {
  //   const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  //   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [file, setFile] = useState(null);

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile({
        ...file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  const RegisterSchema = Yup.object().shape({
    userType: Yup.string().required('User type is required'),
    identificationType: Yup.string().required('ID type is required'),
    identificationNumber: Yup.string().required('ID No is required')
    // identificationDoc: Yup.string().required('Document is required')
  });

  const formik = useFormik({
    initialValues: {
      userType: '',
      identificationType: '',
      identificationNumber: '',
      identificationDoc: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        console.log(values);
        formSubmit(values);
        setcurrentStep('two');
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Who are you ?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="userType"
                onChange={(event) => {
                  console.log(event.currentTarget.value);
                  setFieldValue('userType', event.currentTarget.value);
                  console.log(values);
                }}
              >
                <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
                <FormControlLabel value="Corporate/NGOs" control={<Radio />} label="Corporate/NGOs" />
                <FormControlLabel value="MDAs" control={<Radio />} label="MDAs" />
              </RadioGroup>
            </FormControl>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              select
              fullWidth
              label="ID Type"
              placeholder="ID Type"
              {...getFieldProps('identificationType')}
              SelectProps={{ native: true }}
              error={Boolean(touched.identificationType && errors.identificationType)}
              helperText={touched.identificationType && errors.identificationType}
            >
              <option value="" />
              {IDENTIFICATIONTYPE.map((option) => (
                <option key={option.code} value={option.label}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Stack>

          <TextField
            fullWidth
            autoComplete="id"
            type="text"
            label="ID Number"
            {...getFieldProps('identificationNumber')}
            error={Boolean(touched.identificationNumber && errors.identificationNumber)}
            helperText={touched.identificationNumber && errors.identificationNumber}
          />
          {values.identificationType === IDENTIFICATIONTYPE[1].label ||
          values.identificationType === IDENTIFICATIONTYPE[2].label ? (
            <MotionInView variants={varFadeInUp}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <UploadSingleFile label="Add an identification file here." file={file} onDrop={handleDropSingleFile} />
              </Stack>
            </MotionInView>
          ) : null}

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Next
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
