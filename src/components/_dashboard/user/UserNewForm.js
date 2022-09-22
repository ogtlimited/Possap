import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
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
  Checkbox,
  InputAdornment,
  IconButton,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
// utils
import getUrlString from '../../../utils/get-url-string';
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
  const [policeData, setpoliceData] = useState([]);
  const [department, setdepartment] = useState([]);
  const [officerSection, setofficerSection] = useState([]);
  const [officerSubSection, setofficerSubSection] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const [formationCode, setFormationCode] = useState([]);
  const [departmentCode, setdepartmentCode] = useState([]);
  const [sectionCode, setSectionCode] = useState([]);
  const [subSectionCode, setSubSectionCode] = useState([]);
  const [commandAccess, setCommandAccess] = useState([]);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const officerFormation = [
    { name: 'Force HeadQuaters', code: 1 },
    { name: 'Zonal Command', code: 2 },
    { name: 'State Command', code: 3 }
  ];

  const getCommandDetails = (codes) => {
    const url = getUrlString(`api/v1/helper/police-hr`);
    const response = axios.post(url, { data: codes });
    return response;
  };

  const handleChange = async (val, setFieldValue, fieldName, data, next) => {
    const res = await getCommandDetails(val);
    next(res.data.data);
    // console.log(data, fieldName);
    let fValues = [];
    if (data.sub) {
      fValues = data.sub.map((v) => v.Name);
    } else {
      fValues = data.map((v) => v.name);
    }
    const index = fValues.indexOf(val);
    console.log(val, index);
    if (!Array.isArray(data)) {
      console.log(val, data?.sub[index]);
      if (val === data?.sub[index].Name) {
        console.log(data.sub[index], 'FOUND');
        next(data.sub[index]);
      }
    }
    // console.log(val, data, data.Name, data.name);
    // console.log(fValues.indexOf(val));
    setFieldValue(fieldName, `${val.slice(-1)}`);
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
  // if (error) {
  //   console.log(error);
  // }
  // useEffect(() => {
  //   if (response?.data) {
  //     console.log(response?.data);
  //     setpoliceData(response.data.data);
  //   }
  // }, [response]);

  const createUser = (data) => {
    const url = getUrlString(`api/v1/officers/signup`);
    const response = axios.post(url, data);
    console.log(data);
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
    // officerFormation: Yup.string().required('officerFormation is required'),
    accessType: Yup.string().required('accessType is required'),
    // officerDeptartment: Yup.string().required('officerDeptartment is required'),
    // officerSection: Yup.string().required('officerSection is required'),
    role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.mixed().required('Avatar is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      apNumber: currentUser?.apNumber || '',
      // useServiceNum: currentUser?.apNumber || '',
      fullName: currentUser?.fullName || '',
      userName: currentUser?.userName || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      profile: {
        officerFormation: currentUser?.profile?.officerFormation || '',
        officerDeptartment: currentUser?.profile?.officerDeptartment || '',
        officerSection: currentUser?.profile?.officerSection || '',
        officerSubSection: currentUser?.profile.officerSubSection || ''
      },
      access: {
        role: currentUser?.access?.role || '',
        accessType: currentUser?.access?.accessType || '',
        services: currentUser?.access?.services || []
      },
      // approvalLevel: currentUser?.approvalLevel || '',
      // avatarUrl: currentUser?.avatarUrl || null,
      commandAccess: commandAccess || [],
      status: currentUser?.status,
      password: currentUser?.password || ''
    },
    // validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // await fakeRequest(500);
        createUser(values);
        // resetForm();
        // setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        // navigate(PATH_DASHBOARD.user.list);
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

  const handleSetCommandAccess = useCallback((values) => {
    setCommandAccess(values);
  }, []);

  const [workflowOpen, setWorkflowOpen] = useState(false);
  const [officerWorkflowData, setOfficerWorkflowData] = useState();

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit} enableReinitialize={false}>
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
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    {...getFieldProps('password')}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword} edge="end">
                            <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
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
                    {...getFieldProps('profile.officerFormation')}
                    onChange={(evt) => {
                      setFormationCode(evt.target.value);
                      handleChange(
                        [evt.target.value],
                        setFieldValue,
                        'profile.officerFormation',
                        policeData,
                        setdepartment
                      );
                    }}
                    SelectProps={{ native: false }}
                    error={Boolean(touched.officerFormation && errors.officerFormation)}
                    helperText={touched.officerFormation && errors.officerFormation}
                    value={formationCode}
                  >
                    <option value="" />
                    {officerFormation.map((option) => (
                      <MenuItem key={option.code} value={option.code}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Officer Department"
                    placeholder="officerDeptartment"
                    {...getFieldProps('profile.officerDeptartment')}
                    SelectProps={{ native: false }}
                    onChange={(evt) => {
                      setdepartmentCode(evt.target.value);
                      handleChange(
                        [formationCode, evt.target.value],
                        setFieldValue,
                        'profile.officerDeptartment',
                        department,
                        setofficerSection
                      );
                    }}
                    error={Boolean(touched.officerDeptartment && errors.officerDeptartment)}
                    helperText={touched.officerDeptartment && errors.officerDeptartment}
                    value={departmentCode}
                  >
                    <MenuItem value="" />
                    {department &&
                      department?.map((option) => (
                        <MenuItem key={option.Code} value={option.Code}>
                          {`${option.Name}, ${option.Address}`}
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
                    {...getFieldProps('profile.officerSection')}
                    SelectProps={{ native: false }}
                    onChange={(evt) => {
                      setSectionCode(evt.target.value);
                      handleChange(
                        [formationCode, departmentCode, evt.target.value],
                        setFieldValue,
                        'profile.officerSection',
                        officerSection,
                        setofficerSubSection
                      );
                    }}
                    error={Boolean(touched.officerSection && errors.officerSection)}
                    helperText={touched.officerSection && errors.officerSection}
                    value={sectionCode}
                  >
                    <MenuItem value="" />
                    {officerSection &&
                      officerSection.map((option) => (
                        <MenuItem key={option.Code} value={option.Code}>
                          {option.Name} {option.Address}
                        </MenuItem>
                      ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Officer Sub Section"
                    placeholder="Officer Sub Section"
                    {...getFieldProps('profile.officerSubSection')}
                    SelectProps={{ native: false }}
                    error={Boolean(touched.officerSubSection && errors.officerSubSection)}
                    helperText={touched.officerSubSection && errors.officerSubSection}
                    value={subSectionCode}
                    onChange={(evt) => {
                      setFieldValue('profile.officerSubSection', evt.target.value);
                      setSubSectionCode(evt.target.value);
                    }}
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
                    {...getFieldProps('access.role')}
                    placeholder="Role"
                    onInputChange={(event, newValue) => {
                      setFieldValue('access.role', newValue);
                    }}
                    SelectProps={{ native: true }}
                    options={Role}
                    error={Boolean(touched.access?.role && errors.access?.role)}
                    helperText={touched.access?.role && errors.access?.role}
                    renderInput={(params) => <TextField {...params} label="Role" />}
                  />

                  <TextField
                    select
                    fullWidth
                    label="Access Type"
                    {...getFieldProps('access.accessType')}
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
                      {...getFieldProps('access.services')}
                      error={Boolean(touched.access?.services && errors.access?.services)}
                      helperText={touched.access?.services && errors.access?.services}
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {ServicesList.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          onClick={() => {
                            if (!(values.access.services.indexOf(name) > -1)) {
                              setWorkflowOpen(true);
                            }
                          }}
                        >
                          <Checkbox checked={values.access.services.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  {values.access.accessType === 'Approver' ? (
                    <OfficerWorkFlow
                      services={values.access.services}
                      dialogOpen={workflowOpen}
                      setDialogOpen={setWorkflowOpen}
                      workflowState={officerWorkflowData}
                      setWorkflowState={setOfficerWorkflowData}
                    />
                  ) : null}
                </Stack>
              </Stack>
            </Card>
          </Grid>
          {officerWorkflowData ? (
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 2, pb: 5 }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Service</TableCell>
                        <TableCell>Workflow Data</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.access.services.map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell>{row}</TableCell>
                          <TableCell>
                            {officerWorkflowData[row].map(
                              (i, index) => `${i}${officerWorkflowData[row].length === index + 1 ? '' : ', '}`
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <LoadingButton type="button" variant="contained" onClick={() => setWorkflowOpen(true)}>
                    Edit
                  </LoadingButton>
                </TableContainer>
              </Card>
            </Grid>
          ) : null}
          <Grid item xs={12} md={12}>
            <CommandAccess
              commandAccess={values.commandAccess}
              setCommandAccess={handleSetCommandAccess}
              getCommandDetails={getCommandDetails}
              officerFormationOptions={officerFormation}
            />
          </Grid>
        </Grid>

        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 5, mb: 3 }}>
          Create User
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
