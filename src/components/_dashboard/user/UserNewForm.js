import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';
// utils
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import countries from './countries';

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function UserNewForm({ isEdit, currentUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    apNumber: Yup.string().optional('AP Number is optional'),
    useServiceNum: Yup.boolean(),
    fullName: Yup.string().when('useServiceNum', {
      is: true,
      then: Yup.string().required('Full Name is required')
    }),
    userName: Yup.string().when('useServiceNum', {
      is: true,
      then: Yup.string().required('User Name is required')
    }),
    email: Yup.string()
      .email()
      .when('useServiceNum', {
        is: true,
        then: Yup.string().required('Email is required')
      }),
    phoneNumber: Yup.string().when('useServiceNum', {
      is: true,
      then: Yup.string().required('Phone number is required')
    }),
    approvalLevel: Yup.string().required('approvalLevel is required'),
    officerFormation: Yup.string().required('officerFormation is required'),
    accessType: Yup.string().required('accessType is required'),
    officerDeptartment: Yup.string().required('officerDeptartment is required'),
    officerSection: Yup.string().required('officerSection is required'),
    role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.mixed().required('Avatar is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      apNumber: currentUser?.apNumber || '',
      useServiceNum: currentUser?.apNumber || '',
      fullName: currentUser?.fullName || '',
      userName: currentUser?.userName || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      officerFormation: currentUser?.officerFormation || '',
      officerDeptartment: currentUser?.officerDeptartment || '',
      officerSection: currentUser?.officerSection || '',
      officerSubSection: currentUser?.officerSubSection || '',
      role: currentUser?.role || '',
      accessType: currentUser?.accessType || '',
      approvalLevel: currentUser?.approvalLevel || '',
      avatarUrl: currentUser?.avatarUrl || null,
      service: currentUser?.service || '',
      status: currentUser?.status
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.user.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, pb: 10 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="AP Number"
                    {...getFieldProps('apNumber')}
                    error={Boolean(touched.apNumber && errors.apNumber)}
                    helperText={touched.apNumber && errors.apNumber}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <FormControlLabel
                    // labelPlacement="start"
                    control={<Switch {...getFieldProps('useServiceNum')} checked={values.useServiceNum} />}
                    label={
                      <>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          Use service number as username.
                        </Typography>
                      </>
                    }
                    sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="FullName"
                    disabled={values.useServiceNum}
                    {...getFieldProps('fullName')}
                    error={Boolean(touched.fullName && errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />
                  <TextField
                    fullWidth
                    label="User name"
                    disabled={values.useServiceNum}
                    {...getFieldProps('userName')}
                    error={Boolean(touched.userName && errors.userName)}
                    helperText={touched.userName && errors.userName}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    disabled={values.useServiceNum}
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    disabled={values.useServiceNum}
                    {...getFieldProps('phoneNumber')}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    select
                    fullWidth
                    label="Officer Formation"
                    placeholder="officerFormation"
                    {...getFieldProps('officerFormation')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.officerFormation && errors.officerFormation)}
                    helperText={touched.officerFormation && errors.officerFormation}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Officer Department"
                    placeholder="officerDeptartment"
                    {...getFieldProps('officerDeptartment')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.officerDeptartment && errors.officerDeptartment)}
                    helperText={touched.officerDeptartment && errors.officerDeptartment}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    select
                    fullWidth
                    label="Officer Section"
                    placeholder="Officer Section"
                    {...getFieldProps('officerSection')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.officerSection && errors.officerSection)}
                    helperText={touched.officerSection && errors.officerSection}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Officer Sub Section"
                    placeholder="Officer Sub Section"
                    {...getFieldProps('officerSubSection')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.officerSubSection && errors.officerSubSection)}
                    helperText={touched.officerSubSection && errors.officerSubSection}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="approvalLevel"
                    {...getFieldProps('approvalLevel')}
                    error={Boolean(touched.approvalLevel && errors.approvalLevel)}
                    helperText={touched.approvalLevel && errors.approvalLevel}
                  />
                  <TextField fullWidth label="Zip/Code" {...getFieldProps('officerSubSection')} />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="accessType"
                    {...getFieldProps('accessType')}
                    error={Boolean(touched.accessType && errors.accessType)}
                    helperText={touched.accessType && errors.accessType}
                  />
                  <TextField
                    fullWidth
                    label="Role"
                    {...getFieldProps('role')}
                    error={Boolean(touched.role && errors.role)}
                    helperText={touched.role && errors.role}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Create User' : 'Save Changes'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
