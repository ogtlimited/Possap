import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import arrowBackFill from '@iconify/icons-eva/arrow-back-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Stack, TextField, IconButton, InputAdornment, Alert, Autocomplete } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import NaijaStates from 'naija-state-local-government';
import { getFormOptions } from '../../../utils/getFormOptions';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';
// ----------------------------------------------------------------------

export default function RegisterForm({ setcurrentStep }) {
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [lgaList, setlgaList] = useState([]);

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name required'),
    phone: Yup.string().min(11, 'Too Short!').max(12, 'Too Long!').required('Phone is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    state: Yup.string().required('state is required'),
    lga: Yup.string().required('LGA is required')
  });
  console.log(NaijaStates.states());
  console.log(NaijaStates.lgas('Oyo'));

  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      phone: '',
      state: '',
      lga: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await register(values.email, values.password, values.firstName, values.lastName);
        enqueueSnackbar('Register success', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
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

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            label="Full Name"
            {...getFieldProps('fullName')}
            error={Boolean(touched.fullName && errors.fullName)}
            helperText={touched.fullName && errors.fullName}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              label="Phone"
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Autocomplete
              fullWidth
              onChange={(event, newValue) => {
                setFieldValue(newValue);
              }}
              onInputChange={(event, newValue) => {
                console.log(newValue);
                setFieldValue('state', newValue);
                setlgaList(NaijaStates.lgas(newValue).lgas);
              }}
              id="combo-box-demo"
              options={getFormOptions(NaijaStates.states())}
              // {...getFieldProps('state')}
              error={Boolean(touched.state && errors.state)}
              helperText={touched.state && errors.state}
              renderInput={(params) => <TextField {...params} label="State" />}
            />

            <Autocomplete
              select
              fullWidth
              label="LGA"
              placeholder="LGA"
              onInputChange={(event, newValue) => {
                setFieldValue('lga', newValue);
              }}
              SelectProps={{ native: true }}
              options={lgaList}
              error={Boolean(touched.lga && errors.lga)}
              helperText={touched.lga && errors.lga}
              renderInput={(params) => <TextField {...params} label="LGA" />}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <MIconButton onClick={() => setcurrentStep('one')} variant="contained" color="primary" size="large">
              <Icon icon={arrowBackFill} width={20} height={20} />
            </MIconButton>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Register
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
