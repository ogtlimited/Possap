import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import axios from 'axios';
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
  Autocomplete,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  ListItemText,
  Checkbox
} from '@material-ui/core';
// utils
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import countries from './countries';
import usePoliceData from '../../../db/usePoliceData';
import { AccessType, Role, ServicesList } from './constants';
import OfficerWorkFlow from './officerWorkflow';
import CommandAccess from './commandAccess';

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function UserNewForm({ isEdit, currentUser }) {
  const navigate = useNavigate();
  const { data: response, error } = usePoliceData();
  const [policeData, setpoliceData] = useState([]);
  const [department, setdepartment] = useState({});
  const [officerSection, setofficerSection] = useState([]);
  const [officerSubSection, setofficerSubSection] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (event, setFieldValue, fieldName, data, next) => {
    const val = event.target.value;
    // console.log(data, fieldName);
    let fValues = [];
    if (data.sub) {
      fValues = data.sub.map((v) => v.Name);
    } else {
      fValues = data.map((v) => v.name);
    }
    const index = fValues.indexOf(val);
    console.log(val, index);
    console.log(data);
    if (!Array.isArray(data)) {
      console.log(val, data?.sub[index]);
      if (val === data?.sub[index].Name) {
        console.log(data.sub[index], 'FOUND');
        next(data.sub[index]);
      }
    }
    // console.log(val, data, data.Name, data.name);
    // console.log(fValues.indexOf(val));
    setFieldValue(fieldName, val);
    if (val === data[index]?.name) {
      console.log(data[index].sub);
      next(data[index]);
      // setofficerSection(policeData[index].sub);
    } else if (val === data[index]?.Name) {
      console.log(data[index].sub);
      // next(data[index]);
      // setofficerSection(policeData[index].sub);
    }
  };
  const handleMultiChange = (event, setFieldValue) => {
    const {
      target: { value }
    } = event;
    setFieldValue('service', typeof value === 'string' ? value.split(',') : value);
  };
  if (error) {
    console.log(error);
  }
  useEffect(() => {
    if (response?.data) {
      console.log(response?.data);
      setpoliceData(response.data.data);
    }
  }, [response]);

  const createUser = (data) => {
    axios({
      method: 'post',
      url: '/login',
      data
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      service: currentUser?.service || [],
      commandAccess: currentUser?.commandAccess || [],
      status: currentUser?.status
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // await fakeRequest(500);
        createUser(values);
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
            <Card sx={{ p: 3 }}>
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
            <Card sx={{ p: 3, pb: 10 }}>
              <Stack spacing={3}>
                <Box sx={{ pb: 3 }}>
                  Command Details (<small>This is the command of the user</small>)
                </Box>
                <Stack sx={{ pb: 3 }} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    select
                    fullWidth
                    label="Officer Formation"
                    placeholder="officerFormation"
                    {...getFieldProps('officerFormation')}
                    onChange={(evt) => handleChange(evt, setFieldValue, 'officerFormation', policeData, setdepartment)}
                    SelectProps={{ native: false }}
                    error={Boolean(touched.officerFormation && errors.officerFormation)}
                    helperText={touched.officerFormation && errors.officerFormation}
                  >
                    <option value="" />
                    {policeData.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Officer Department"
                    placeholder="officerDeptartment"
                    {...getFieldProps('officerDeptartment')}
                    SelectProps={{ native: false }}
                    onChange={(evt) => {
                      handleChange(evt, setFieldValue, 'officerDeptartment', department, setofficerSection);
                    }}
                    error={Boolean(touched.officerDeptartment && errors.officerDeptartment)}
                    helperText={touched.officerDeptartment && errors.officerDeptartment}
                  >
                    <MenuItem value="" />
                    {department.sub &&
                      department?.sub?.map((option) => (
                        <MenuItem key={option.code} value={option.Name}>
                          {`${option.Name} ${option.Address}`}
                        </MenuItem>
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
                    SelectProps={{ native: false }}
                    onChange={(evt) => {
                      handleChange(evt, setFieldValue, 'officerSection', officerSection, setofficerSubSection);
                    }}
                    error={Boolean(touched.officerSection && errors.officerSection)}
                    helperText={touched.officerSection && errors.officerSection}
                  >
                    <MenuItem value="" />
                    {officerSection.sub &&
                      officerSection?.sub?.map((option) => (
                        <MenuItem key={option.Code} value={option.Name}>
                          {option.Name} {option.Address}
                        </MenuItem>
                      ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Officer Sub Section"
                    placeholder="Officer Sub Section"
                    {...getFieldProps('officerSubSection')}
                    SelectProps={{ native: false }}
                    error={Boolean(touched.officerSubSection && errors.officerSubSection)}
                    helperText={touched.officerSubSection && errors.officerSubSection}
                  >
                    <MenuItem value="" />
                    {officerSubSection?.sub?.map((option) => (
                      <MenuItem key={option.code} value={option.Name}>
                        {option.Name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3, pb: 10 }}>
              <Stack spacing={3}>
                <Box sx={{ pb: 3 }}>
                  User Access (<small>This defines the user's access level</small>)
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <Autocomplete
                    select
                    fullWidth
                    label="Role"
                    placeholder="Role"
                    onInputChange={(event, newValue) => {
                      setFieldValue('role', newValue);
                    }}
                    SelectProps={{ native: true }}
                    options={Role}
                    {...getFieldProps('role')}
                    error={Boolean(touched.role && errors.role)}
                    helperText={touched.role && errors.role}
                    renderInput={(params) => <TextField {...params} label="Role" />}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Access Type"
                    {...getFieldProps('accessType')}
                    error={Boolean(touched.accessType && errors.accessType)}
                    helperText={touched.accessType && errors.accessType}
                    SelectProps={{ native: false }}
                  >
                    {AccessType.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <FormControl sx={{ m: 1, width: '100%' }}>
                    <InputLabel id="demo-multiple-checkbox-label">Service</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      onChange={(evt) => handleMultiChange(evt, setFieldValue)}
                      {...getFieldProps('service')}
                      error={Boolean(touched.service && errors.service)}
                      helperText={touched.service && errors.service}
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {ServicesList.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={values.service.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  {values.accessType === 'Approver' && <OfficerWorkFlow services={values.service} />}
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <CommandAccess commandAccess={values.commandAccess} setCommandAccess={setFieldValue} />
          </Grid>
        </Grid>

        <LoadingButton
          size="large"
          // onClick={() => handleOnSubmit(values)}
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 5, mb: 3 }}
        >
          Create User
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
